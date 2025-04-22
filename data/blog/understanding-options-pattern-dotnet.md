---
title: 'Understanding the Options Pattern in .NET'
date: '2025-04-20'
tags: ['dotnet', 'configuration', 'dependency injection', 'options pattern']
draft: false
summary: 'Explore how the Options Pattern in .NET provides a clean, type-safe way to manage configuration settings through strongly-typed classes, dependency injection integration, and flexible validation options. Learn to implement this pattern for more maintainable and testable application configuration.'
---

# Understanding the Options Pattern in .NET

Configuration is a fundamental concern in any modern application. Hard‑coding settings or scattering magic strings throughout your code makes maintenance difficult and error‑prone. The **Options Pattern** in .NET provides a clean, type‑safe way to represent related settings as classes, bind them to configuration sources, and consume them via dependency injection.  

The options pattern uses classes to provide strongly‑typed access to groups of related settings. When configuration settings are isolated by scenario into separate classes, your app adheres to the **Interface Segregation Principle** (classes depend only on the settings they use) and **Separation of Concerns** (settings for different parts of the app aren't coupled).

## Why Use the Options Pattern?

1. **Strong typing**  
   Avoid magic strings and casting. Configuration is bound directly to properties on a class.  
2. **Dependency Injection (DI) integration**  
   Options classes are registered in DI and can be injected where needed.  
3. **Lifetime control**  
   Choose between singleton (`IOptions<T>`), scoped (`IOptionsSnapshot<T>`), or change‑aware (`IOptionsMonitor<T>`) lifetimes.  
4. **Validation**  
   Validate options at startup or runtime using data annotations or custom validators.  
5. **Named Options**  
   Support multiple named configurations of the same type.  

## Defining an Options Class

Given an `appsettings.json` snippet:

```json
{
  "EmailSettings": {
    "SmtpServer": "smtp.example.com",
    "Port": 587,
    "UseSsl": true
  }
}
```

Create a corresponding class:

```csharp
public class EmailSettings
{
    public const string SectionName = "EmailSettings";

    public string SmtpServer { get; set; } = string.Empty;
    public int Port { get; set; }
    public bool UseSsl { get; set; }
}
```

- The class **must** be non‑abstract with a public parameterless constructor.  
- Only public read/write properties are bound.  
- A `const string SectionName` helps avoid magic strings when binding.

## Registering Options with DI

In `Program.cs` (or `Startup.cs` for older versions), bind the configuration section:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Bind EmailSettings to the "EmailSettings" section
builder.Services
       .AddOptions<EmailSettings>()
       .Bind(builder.Configuration.GetSection(EmailSettings.SectionName))
       .ValidateDataAnnotations(); // optional, for DataAnnotations validation

var app = builder.Build();
```

- `AddOptions<T>()` returns an `OptionsBuilder<T>`, enabling fluent configuration.  
- `Bind(...)` ties the class to the JSON (or other) configuration provider.  
- `ValidateDataAnnotations()` (requires `Microsoft.Extensions.Options.DataAnnotations` package) enforces `[Required]`, `[Range]`, etc.

## Consuming Options

### IOptions&lt;T&gt;

Inject `IOptions<EmailSettings>` for **singleton** consumption:

```csharp
public class EmailService
{
    private readonly EmailSettings _settings;

    public EmailService(IOptions<EmailSettings> options)
    {
        _settings = options.Value;
    }
}
```

- `IOptions<T>.Value` is evaluated once when accessed.  
- Suitable for transient or scoped services that don't need live reloads.

### IOptionsSnapshot&lt;T&gt;

Use `IOptionsSnapshot<EmailSettings>` in **scoped** services (e.g., per‑request in ASP.NET Core):

```csharp
public class ScopedEmailService
{
    private readonly EmailSettings _settings;

    public ScopedEmailService(IOptionsSnapshot<EmailSettings> options)
    {
        _settings = options.Value;
    }
}
```

- Options are computed once per scope and cached.  
- Supports reloading when configuration sources change (e.g., updated JSON file) between scopes.

### IOptionsMonitor&lt;T&gt;

For **singleton** services that need to react to changes at runtime:

```csharp
public class MonitorEmailService
{
    private readonly IOptionsMonitor<EmailSettings> _monitor;

    public MonitorEmailService(IOptionsMonitor<EmailSettings> monitor)
    {
        _monitor = monitor;
        _monitor.OnChange(OnSettingsChanged);
    }

    private void OnSettingsChanged(EmailSettings newSettings)
    {
        // React to updated settings
    }
}
```

- `CurrentValue` always reflects the latest configuration.  
- Raise `OnChange` events when underlying configuration files (JSON, XML, etc.) change.

## Named Options

When you need multiple configurations of the same type—say, two SMTP profiles—you can use **named options**:

```json
{
  "EmailSettings": {
    "Primary": { "SmtpServer": "...", "Port": 587, "UseSsl": true },
    "Backup":  { "SmtpServer": "...", "Port": 25,  "UseSsl": false }
  }
}
```

Register both:

```csharp
builder.Services
    .AddOptions<EmailSettings>("Primary")
    .Bind(builder.Configuration.GetSection("EmailSettings:Primary"));

builder.Services
    .AddOptions<EmailSettings>("Backup")
    .Bind(builder.Configuration.GetSection("EmailSettings:Backup"));
```

Consume via `IOptionsSnapshot<EmailSettings>`:

```csharp
public class MultiEmailService
{
    private readonly EmailSettings _primary;
    private readonly EmailSettings _backup;

    public MultiEmailService(IOptionsSnapshot<EmailSettings> options)
    {
        _primary = options.Get("Primary");
        _backup  = options.Get("Backup");
    }
}
```

Named options are case‑sensitive and support all the same features (validation, monitoring) as the default.

## Validating Options

### Data Annotations

Decorate your options class:

```csharp
public class EmailSettings
{
    public const string SectionName = "EmailSettings";

    [Required] public string SmtpServer { get; set; } = string.Empty;
    [Range(1, 65_535)] public int Port { get; set; }
    public bool UseSsl { get; set; }
}
```

And register:

```csharp
builder.Services
       .AddOptions<EmailSettings>()
       .Bind(...)
       .ValidateDataAnnotations()
       .ValidateOnStart(); // throws on startup if invalid
```

Validation errors throw an `OptionsValidationException`.

### Custom Validators

Implement `IValidateOptions<T>` for complex rules:

```csharp
public class EmailSettingsValidator 
    : IValidateOptions<EmailSettings>
{
    public ValidateOptionsResult Validate(string? name, EmailSettings options)
    {
        if (!options.SmtpServer.StartsWith("smtp."))
            return ValidateOptionsResult.Fail("SmtpServer must start with smtp.");

        return ValidateOptionsResult.Success;
    }
}

// Registration
builder.Services
       .Configure<EmailSettings>(...)
       .Services.TryAddEnumerable(
            ServiceDescriptor.Singleton<
                IValidateOptions<EmailSettings>, 
                EmailSettingsValidator>());
```

This approach decouples validation logic from the options class itself.

## Post-Configuration and Advanced Scenarios

- **Post-Configure**  
  Override or augment bound values after all `Configure` calls:

  ```csharp
  builder.Services.PostConfigure<EmailSettings>(opts =>
  {
      if (opts.Port == 0) opts.Port = 25;
  });
  ```

- **OptionsBuilder API**  
  Leverage `OptionsBuilder<T>` to combine multiple configuration delegates, validation, and named options in a fluent chain.

- **Configuration Delegates with Services**  
  Inject other services to compute option values:

  ```csharp
  builder.Services
      .AddOptions<MyOptions>()
      .Configure<ILoggerFactory>((opts, loggerFactory) =>
      {
          opts.LogLevel = loggerFactory.CreateLogger("default").IsEnabled(LogLevel.Debug)
                          ? LogLevel.Debug
                          : LogLevel.Information;
      });
  ```

## Sample End-to-End Example

1. **appsettings.json**  

   ```json
   {
     "EmailSettings": {
       "SmtpServer": "smtp.example.com",
       "Port": 587,
       "UseSsl": true
     }
   }
   ```

2. **Program.cs**  
   ```csharp
   var builder = WebApplication.CreateBuilder(args);

   // Bind and validate EmailSettings
   builder.Services
          .AddOptions<EmailSettings>()
          .Bind(builder.Configuration.GetSection(EmailSettings.SectionName))
          .ValidateDataAnnotations()
          .Validate(opts => opts.Port > 0, "Port must be greater than zero")
          .ValidateOnStart();

   builder.Services.AddTransient<EmailService>();

   var app = builder.Build();
   app.MapGet("/", (EmailService svc) =>
   {
       // Use svc to send email or inspect settings
       return Results.Ok();
   });

   app.Run();
   ```

3. **EmailService.cs**  
   ```csharp
   public class EmailService
   {
       private readonly EmailSettings _settings;
       public EmailService(IOptions<EmailSettings> options) 
           => _settings = options.Value;

       public void Send(string to, string subject, string body)
       {
           using var client = new SmtpClient(_settings.SmtpServer, _settings.Port)
           {
               EnableSsl = _settings.UseSsl
           };
           // send logic…
       }
   }
   ```

## Summary

By following the Options Pattern, you achieve **strong typing**, **centralized configuration**, **easy validation**, and **flexible lifetimes**, all integrated seamlessly with .NET's dependency injection system. Whether you're building microservices, web apps, or libraries, the options pattern will help keep your configuration robust, maintainable, and testable.
