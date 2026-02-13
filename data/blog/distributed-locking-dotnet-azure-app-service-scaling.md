---
title: "Distributed Locking in .NET: Preventing Duplicate Processing When Scaling Azure App Service"
date: 2026-02-13
description: "Learn how to implement distributed locking for scheduled background tasks in .NET when scaling Azure App Service to multiple instances. Prevent duplicate  processing with industry-standard patterns."
tags: [dotnet, csharp, azure, appservice, distributed-systems, concurrency, background-tasks, payments]
draft: false
summary: "When scaling Azure App Service to multiple instances, scheduled background tasks can run simultaneously causing duplicate processing. This post covers industry-standard solutions using proven libraries and patterns."
---

## The Problem

We have a scheduled background task in .NET that processes invoices every 5 minutes. The task runs as a `BackgroundService` and handles payment processing for pending invoices.

```csharp
public class InvoiceProcessorService : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await ProcessPendingInvoicesAsync();
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }
    
    private async Task ProcessPendingInvoicesAsync()
    {
        var pendingInvoices = await _invoiceRepository.GetPendingAsync();
        foreach (var invoice in pendingInvoices)
        {
            await _paymentService.ProcessPaymentAsync(invoice);
            await _invoiceRepository.MarkAsPaidAsync(invoice.Id);
        }
    }
}
```

This works perfectly with a single instance. But now we're scaling to **5 instances** for high availability.

### What happens with multiple instances?

When the timer fires at the 5-minute mark:
- Instance 1 starts processing invoices
- Instance 2 starts processing the **same** invoices
- Instance 3, 4, 5... all do the same

**Result**: Duplicate payments, angry customers, financial reconciliation nightmares.

### Why not just hardcode a "primary" instance?

This defeats the purpose of scaling:
- **No high availability** - if the primary dies, no processing happens
- **Manual intervention** - someone needs to reassign primary during failures
- **Configuration drift** - environment-specific configs are error-prone

We need a **distributed coordination mechanism** that automatically ensures only one instance processes at a time, with automatic failover.

### Why run 5 instances if only one processes?

The 5 instances aren't for **parallelism** - they're for **resilience**:

| Goal | Explanation |
|------|-------------|
| **Failover** | If Instance 1 crashes, Instance 2 picks up on the next cycle |
| **No single point of failure** | Any instance can do the work; none is "special" |
| **Zero-downtime deployments** | During rolling updates, at least one instance is always available |
| **Infrastructure resilience** | Instances on different nodes; hardware failure doesn't stop processing |

```
Every 5 minutes:
─────────────────────────────────────────────────────────────────►

Instance 1: [Try Lock] ✓ Got it → [Process] → [Release]
Instance 2: [Try Lock] ✗ Skip
Instance 3: [Try Lock] ✗ Skip
Instance 4: [Try Lock] ✗ Skip
Instance 5: [Try Lock] ✗ Skip

Next cycle (Instance 1 crashed):

Instance 1: 💀 Dead
Instance 2: [Try Lock] ✓ Got it → [Process] → [Release]
Instance 3: [Try Lock] ✗ Skip
...
```

Only **one** instance does the work, but **any** instance **can** do the work.

---

## Industry Standard: Use Proven Libraries

**Don't roll your own distributed lock.** Use battle-tested libraries:

| Library | Best For | NuGet |
|---------|----------|-------|
| **[DistributedLock](https://github.com/madelson/DistributedLock)** | Most scenarios | `DistributedLock.*` |
| **[RedLock.net](https://github.com/samcook/RedLock.net)** | Redis-based | `RedLock.net` |
| **Azure WebJobs `[Singleton]`** | Azure Functions/WebJobs | Built-in |

For Azure App Service, the `DistributedLock` library with Azure Blob backend is the recommended approach.

---

## Recommended: DistributedLock with Azure Blob

### Installation

```bash
dotnet add package DistributedLock.Azure
```

### Implementation

```csharp
public class InvoiceProcessorService : BackgroundService
{
    private readonly AzureBlobLeaseDistributedLockProvider _lockProvider;
    private readonly IInvoiceProcessor _processor;
    private readonly ILogger<InvoiceProcessorService> _logger;

    public InvoiceProcessorService(
        BlobContainerClient blobContainer,
        IInvoiceProcessor processor,
        ILogger<InvoiceProcessorService> logger)
    {
        _lockProvider = new AzureBlobLeaseDistributedLockProvider(blobContainer);
        _processor = processor;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await TryProcessWithLockAsync(stoppingToken);
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }

    private async Task TryProcessWithLockAsync(CancellationToken ct)
    {
        var @lock = _lockProvider.CreateLock("invoice-processing");
        
        await using var handle = await @lock.TryAcquireAsync(cancellationToken: ct);
        
        if (handle == null)
        {
            _logger.LogDebug("Another instance is processing, skipping");
            return;
        }

        _logger.LogInformation("Lock acquired, processing invoices");
        await _processor.ProcessPendingInvoicesAsync(ct);
    }
}
```

### DI Registration

```csharp
builder.Services.AddSingleton(sp =>
{
    var blobServiceClient = sp.GetRequiredService<BlobServiceClient>();
    return blobServiceClient.GetBlobContainerClient("locks");
});

builder.Services.AddHostedService<InvoiceProcessorService>();
```

The library handles:
- Lease acquisition and renewal
- Automatic release on dispose
- Crash recovery (lease expiry)
- Edge cases you'd miss implementing yourself

---

## What Happens When an Instance Crashes?

This is a critical question. When Instance 1 crashes while holding the lock and processing invoices:

### Lock Auto-Releases

Azure Blob Lease (used by `DistributedLock`) has a **maximum 60-second lease duration**. If the instance crashes:

```
Timeline:
─────────────────────────────────────────────────────────────────────────────►

Instance 1: [Acquire Lock (60s)]──[Processing Invoice 1]──[Invoice 2]──💀 CRASH
                     │                                                    │
                     │                                          Lock still held!
                     │
            Lock expires automatically after 60 seconds
                                                                          │
                                                                          ▼
Instance 2:                                                    [Try Lock] ✓ Got it!
                                                               (lease expired)
```

**No manual intervention required.** The lease expires, and another instance takes over.

### What About Partially Processed Invoices?

When Instance 1 crashes mid-processing:

| Invoice | Status | What Happens |
|---------|--------|--------------|
| Invoice 1 | Paid (completed before crash) | ✓ Done |
| Invoice 2 | Processing (crashed mid-way) | ⚠️ Needs recovery |
| Invoice 3, 4, 5... | Pending (not started) | Instance 2 will process |

**Invoice 2 is the problem.** Two failure scenarios:
1. Payment API called, DB not updated → Customer charged, invoice shows unpaid
2. DB updated to "Processing", payment not called → Invoice stuck

### Recovery Strategy

Each defense layer handles part of the recovery:

```csharp
// Query includes stuck invoices (Processing for too long)
var invoices = await _db.Invoices
    .Where(i => i.Status == InvoiceStatus.Pending 
             || (i.Status == InvoiceStatus.Processing 
                 && i.ClaimedAt < DateTime.UtcNow.AddMinutes(-5))) // Stale
    .ToListAsync(ct);
```

When Instance 2 retries Invoice 2:
- **Optimistic concurrency** → Reclaims the stale invoice
- **Idempotency key** → Payment provider returns cached response if already charged
- **Transactional outbox** → If crash was before commit, nothing persisted (clean slate)

The system **assumes failures will happen** and recovers automatically.

---

## Critical: Locking Alone Is Not Enough

Distributed locks can fail in subtle ways. For payment processing, you need **defense in depth**:

1. **Distributed Lock** - prevents simultaneous processing
2. **Idempotency** - prevents duplicate processing on retries
3. **Transactional Outbox** - prevents dual-write failures

### Why Locks Can Fail

```
Timeline:
────────────────────────────────────────────────────────────────►

Instance A: [Acquire Lock]──[Processing]──[GC PAUSE 90s]──[Resumes, thinks it has lock]──[Writes]
                                                │
Instance B:              [Lock Expired]─────────[Acquires Lock]──[Processing]──[Writes]
                                                                                    │
                                                                      CONFLICT! Both wrote
```

Instance A's lock expired during a GC pause, but it doesn't know. It continues and writes stale data.

---

## Layer 1: Idempotent Processing

Use **optimistic concurrency** to ensure each invoice is processed exactly once:

```csharp
public class InvoiceProcessor : IInvoiceProcessor
{
    public async Task ProcessPendingInvoicesAsync(CancellationToken ct)
    {
        var pendingInvoices = await _repository.GetPendingAsync(ct);
        
        foreach (var invoice in pendingInvoices)
        {
            await ProcessInvoiceIdempotentlyAsync(invoice, ct);
        }
    }

    private async Task ProcessInvoiceIdempotentlyAsync(Invoice invoice, CancellationToken ct)
    {
        // Atomically claim the invoice using optimistic concurrency
        var claimed = await _repository.TryClaimForProcessingAsync(
            invoice.Id, 
            invoice.RowVersion, 
            ct);
        
        if (!claimed)
        {
            _logger.LogDebug("Invoice {Id} already claimed, skipping", invoice.Id);
            return;
        }

        // Process with idempotency key for payment provider
        await _paymentService.ProcessPaymentAsync(
            invoice, 
            idempotencyKey: $"invoice-{invoice.Id}");
        
        await _repository.MarkAsPaidAsync(invoice.Id, ct);
    }
}
```

### Repository with Optimistic Concurrency and Stale Recovery

```csharp
public async Task<List<Invoice>> GetPendingOrStaleAsync(CancellationToken ct)
{
    var staleThreshold = DateTime.UtcNow.AddMinutes(-5);
    
    return await _db.Invoices
        .Where(i => i.Status == InvoiceStatus.Pending 
                 || (i.Status == InvoiceStatus.Processing 
                     && i.ClaimedAt < staleThreshold)) // Recover stuck invoices
        .ToListAsync(ct);
}

public async Task<bool> TryClaimForProcessingAsync(
    int invoiceId, 
    byte[] expectedRowVersion,
    CancellationToken ct)
{
    var staleThreshold = DateTime.UtcNow.AddMinutes(-5);
    
    // Claims pending invoices OR reclaims stale "Processing" invoices
    var rowsAffected = await _db.Database.ExecuteSqlRawAsync(@"
        UPDATE Invoices 
        SET Status = 'Processing', 
            ClaimedAt = GETUTCDATE(),
            ClaimedBy = @p0,
            RetryCount = RetryCount + 1
        WHERE Id = @p1 
          AND RowVersion = @p2
          AND (Status = 'Pending' 
               OR (Status = 'Processing' AND ClaimedAt < @p3))",
        Environment.MachineName, invoiceId, expectedRowVersion, staleThreshold);

    return rowsAffected > 0;
}
```

### Payment Service with Idempotency Key

Every major payment provider supports idempotency keys:

```csharp
public class StripePaymentService : IPaymentService
{
    public async Task ProcessPaymentAsync(Invoice invoice, string idempotencyKey)
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(invoice.Amount * 100),
            Currency = "usd",
            Customer = invoice.CustomerId,
        };

        // Stripe won't process duplicate payments with same idempotency key
        var requestOptions = new RequestOptions
        {
            IdempotencyKey = idempotencyKey
        };

        await _stripeClient.PaymentIntents.CreateAsync(options, requestOptions);
    }
}
```

---

## Layer 2: Transactional Outbox (For Critical Payments)

The code above has a **dual-write problem**:

```csharp
await _paymentService.ProcessPaymentAsync(invoice);  // 1. External API call
await _repository.MarkAsPaidAsync(invoice.Id);       // 2. Database update
```

If step 1 succeeds but step 2 fails, the customer is charged but the invoice shows unpaid.

### Solution: Use MassTransit Outbox

For critical payment flows, use the **transactional outbox pattern** with MassTransit:

```bash
dotnet add package MassTransit
dotnet add package MassTransit.EntityFrameworkCore
```

```csharp
// Program.cs
builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<ProcessPaymentConsumer>();
    
    x.AddEntityFrameworkOutbox<AppDbContext>(o =>
    {
        o.UseSqlServer();
        o.UseBusOutbox();
    });

    x.UsingAzureServiceBus((context, cfg) =>
    {
        cfg.Host(connectionString);
        cfg.ConfigureEndpoints(context);
    });
});
```

### Queue Payment Intent (Atomic)

```csharp
public class InvoiceProcessor : IInvoiceProcessor
{
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly AppDbContext _db;

    public async Task ProcessPendingInvoicesAsync(CancellationToken ct)
    {
        var pendingInvoices = await _db.Invoices
            .Where(i => i.Status == InvoiceStatus.Pending)
            .ToListAsync(ct);

        foreach (var invoice in pendingInvoices)
        {
            await using var transaction = await _db.Database.BeginTransactionAsync(ct);
            
            // Claim invoice
            invoice.Status = InvoiceStatus.Processing;
            
            // Queue payment command (goes to outbox table, same transaction)
            await _publishEndpoint.Publish(new ProcessPaymentCommand
            {
                InvoiceId = invoice.Id,
                IdempotencyKey = $"invoice-{invoice.Id}"
            }, ct);
            
            await _db.SaveChangesAsync(ct);
            await transaction.CommitAsync(ct);
        }
    }
}
```

### Payment Consumer

```csharp
public class ProcessPaymentConsumer : IConsumer<ProcessPaymentCommand>
{
    public async Task Consume(ConsumeContext<ProcessPaymentCommand> context)
    {
        var invoice = await _db.Invoices.FindAsync(context.Message.InvoiceId);
        
        if (invoice.Status == InvoiceStatus.Paid)
            return; // Already processed
        
        await _paymentService.ProcessPaymentAsync(
            invoice, 
            context.Message.IdempotencyKey);
        
        invoice.Status = InvoiceStatus.Paid;
        invoice.PaidAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
    }
}
```

MassTransit handles:
- Transactional outbox (atomic DB + message)
- Retry with exponential backoff
- Dead letter queue for failures
- Exactly-once delivery semantics

---

## Complete Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEFENSE IN DEPTH                              │
└─────────────────────────────────────────────────────────────────┘

Layer 1: DISTRIBUTED LOCK (DistributedLock library)
         └─ Prevents multiple instances processing simultaneously

Layer 2: OPTIMISTIC CONCURRENCY (RowVersion/ETag)
         └─ Prevents duplicate processing if lock fails

Layer 3: IDEMPOTENCY KEY (Payment provider)
         └─ Prevents duplicate charges on retry

Layer 4: TRANSACTIONAL OUTBOX (MassTransit)
         └─ Prevents dual-write failures (API + DB)
```

---

## Quick Reference: When to Use What

| Scenario | Solution |
|----------|----------|
| Simple background job, low risk | DistributedLock + Optimistic Concurrency |
| Payment processing | All 4 layers |
| Already using Azure Functions | `[Singleton]` attribute |
| High-frequency locking (>1/sec) | Redis with RedLock.net |
| Message-driven architecture | Azure Service Bus Sessions |

## Key Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Locks auto-expire** | 60-second blob lease; no manual cleanup needed |
| **Stale recovery** | Query includes invoices stuck in "Processing" > 5 mins |
| **Idempotent retries** | Payment provider idempotency key prevents double-charge |
| **Atomic operations** | Transactional outbox ensures DB + message consistency |
| **Assume failure** | Every layer handles the previous layer's failure |

---

## Alternative: Azure WebJobs Singleton

If you're using Azure Functions or WebJobs, the simplest solution is built-in:

```csharp
public class Functions
{
    [Singleton]
    [FunctionName("ProcessInvoices")]
    public async Task Run([TimerTrigger("0 */5 * * * *")] TimerInfo timer)
    {
        // Only one instance runs at a time - SDK handles locking
        await _processor.ProcessPendingInvoicesAsync();
    }
}
```

The `[Singleton]` attribute uses blob leases internally.

---

## Monitoring

Track these metrics to ensure the system is healthy:

```csharp
public class InvoiceProcessorService : BackgroundService
{
    private async Task TryProcessWithLockAsync(CancellationToken ct)
    {
        using var activity = ActivitySource.StartActivity("ProcessInvoices");
        
        var @lock = _lockProvider.CreateLock("invoice-processing");
        await using var handle = await @lock.TryAcquireAsync(cancellationToken: ct);
        
        if (handle == null)
        {
            _metrics.IncrementCounter("invoice_processing_lock_skipped");
            return;
        }

        _metrics.IncrementCounter("invoice_processing_lock_acquired");
        
        var sw = Stopwatch.StartNew();
        var count = await _processor.ProcessPendingInvoicesAsync(ct);
        
        _metrics.RecordHistogram("invoice_processing_duration_seconds", sw.Elapsed.TotalSeconds);
        _metrics.RecordGauge("invoice_processing_count", count);
    }
}
```

**Alert on:**
- No successful processing in 15+ minutes
- High lock contention (many skips)
- Processing duration exceeding threshold

---

## Summary

For payment processing in a scaled Azure App Service:

1. **Run multiple instances for resilience, not parallelism** - any instance can do the work; none is special
2. **Use `DistributedLock` library** - don't implement locking yourself
3. **Trust lock auto-expiry for crash recovery** - 60-second lease handles instance failures
4. **Add optimistic concurrency with stale recovery** - reclaim stuck invoices automatically
5. **Use idempotency keys** - every payment provider supports this
6. **Consider transactional outbox** - for critical payment flows

The combination of these patterns ensures exactly-once processing even when individual components fail, and automatic recovery when instances crash mid-processing.

---

## Further Reading

- [DistributedLock Library](https://github.com/madelson/DistributedLock)
- [MassTransit Transactional Outbox](https://masstransit.io/documentation/patterns/transactional-outbox)
- [Stripe Idempotent Requests](https://stripe.com/docs/api/idempotent_requests)
- [Azure WebJobs Singleton](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer#singleton-attribute)
