---
title: "Thread Pool Starvation in .NET: Why Sync-over-Async Breaks Azure App Service"
date: 2026-02-11
description: "Understand why using .Result on async calls in ASP.NET Core can cause thread pool starvation in Azure App Service, how to identify it from metrics, and how to fix it with async all the way."
tags: [dotnet, csharp, aspnetcore, azure, appservice, performance, async]
draft: false
summary: "Sync-over-async with .Result can silently destroy throughput in Azure App Service by blocking request threads. Learn the failure pattern, symptoms, and the production-safe fix."
---

During an code review, I came acros a code something simlar to following. This service runs in Azure app service as well. 

> "Why is this code dangerous in Azure App Service?"

```csharp
public async Task<IActionResult> GetOrderDetails(int id)
{
    // Getting the data using a synchronous-style call on an async method
    var order = _orderService.GetOrderAsync(id).Result;

    return Ok(order);
}
```

This is **sync-over-async**, and under load it can crush our app's throughput.

## The core issue: sync-over-async

`GetOrderAsync(id)` is asynchronous, but `.Result` forces synchronous waiting behavior.
That means the request thread is blocked until the async operation completes.

In server apps, blocked threads are expensive. In high traffic, this causes many request threads to block simultaneously.

## What thread pool starvation means in ASP.NET Core

ASP.NET Core uses the .NET ThreadPool to process incoming requests.

Healthy async flow:

- Request starts on a thread
- App hits I/O (`await db`, `await http`, `await file`)
- Thread is released back to pool while waiting
- Continuation resumes later when I/O completes

Broken flow (`.Result`, `.Wait()`):

- Request thread is pinned and waiting
- It cannot process other requests
- Under concurrency, threads get exhausted
- New requests queue up waiting for available threads

That queueing and blocked-thread pattern is thread pool starvation.

## Effect Azure App Service

When this happens in Azure App Service, you often see a confusing metric pattern:

- High thread count
- High request wait time or queued requests
- Low or moderate CPU
- Latency spikes and intermittent timeouts (5xx)

We expect high CPU during incidents. Here, CPU can remain low because threads are waiting on I/O, not actively computing.
So the app can look underutilized while users are getting slow responses or failures.

## The fix: async all the way down

Never block on async code in request paths. Use `await` and keep the full call chain async.

### Controller (fixed)

```csharp
public async Task<IActionResult> GetOrderDetails(int id)
{
    var order = await _orderService.GetOrderAsync(id);
    return Ok(order);
}
```

### Service

```csharp
public async Task<OrderDto> GetOrderAsync(int id)
{
    return await _orderRepository.GetOrderAsync(id);
}
```

### Repository (EF Core example)

```csharp
public async Task<OrderDto> GetOrderAsync(int id)
{
    return await _dbContext.Orders
        .Where(o => o.Id == id)
        .Select(o => new OrderDto { Id = o.Id, Total = o.Total })
        .SingleOrDefaultAsync();
}
```

If one layer reintroduces sync blocking, the benefits collapse.

## Common anti-patterns to avoid

- `.Result` on `Task`
- `.Wait()` on `Task`
- `.GetAwaiter().GetResult()` in request-handling code
- Wrapping I/O-bound server code in `Task.Run` as a workaround
- Mixing async controllers with sync DB/HTTP calls

## How to validate the fix

After replacing sync-over-async:

1. Run a controlled load test
2. Compare before and after:
   - p95/p99 latency
   - throughput (requests/sec)
   - request queueing or wait time
   - thread growth behavior
3. Confirm improvements during peak traffic windows in App Service metrics and logs

You should see lower wait times, steadier latency, and better throughput under concurrency.


## Final takeaway

If a method is async, **await it**.
In server code, sync-over-async is a scalability bug, not just a style issue.
