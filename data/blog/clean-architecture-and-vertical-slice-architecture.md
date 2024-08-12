---
title: 'Clean Architecture and Vertical Slice Architecture'
date: '2024-08-13'
tags: ['Software Architecture', 'Clean Architecutre', 'Verticle Slice Architecutre']
draft: false
summary: 'One common challenge in software development is organizing the code to be clear and easy to work with. This is where different architectural styles, like Clean Architecture and Vertical Slice Architecture, come into play.'
---

### **Introduction**

One common challenge in software development is organizing the code to be clear and easy to work with. This is where different architectural styles, like **Clean Architecture** and **Vertical Slice Architecture**, come into play.

- **Clean Architecture** keeps the core business logic separate from the technical details like databases and user interfaces.
- **Vertical Slice Architecture** groups all the code for each feature together, making working on one feature at a time easier.

### **1. Understanding Clean Architecture**

![CleanArchitecture.jpg](/static/images/CleanArchitecture.jpg)

**Concept**:

- Clean Architecture is similar to Onion Architecture but more flexible. It introduces additional layers and focuses on making the core business logic independent of the delivery mechanisms, frameworks, and data sources.
- It also enforces the dependency rule where the outer layers depend on the inner layers.

**Layers**:

- **Entities (Domain)**: The core business rules.
- **Use Cases (Application)**: Specific business logic or use cases. It interacts with the domain layer and defines the application's behavior.
- **Interface Adapters (Adapters)**: Translates data between the use cases and the external layers (e.g., controllers, views, repositories).
- **Frameworks & Drivers (Infrastructure)**: External frameworks, databases, UI, or anything not core to the business logic.

**Folder Structure Example in C#**:

```css
cssCopy code
src/
├── MyApp.Domain/
│   ├── Entities/
│   ├── ValueObjects/
│   └── Interfaces/
├── MyApp.Application/
│   ├── UseCases/
│   ├── Interfaces/
│   └── Services/
├── MyApp.Adapters/
│   ├── Controllers/
│   ├── Mappers/
│   ├── Repositories/
│   └── DTOs/
└── MyApp.Infrastructure/
    ├── Data/
    └── ExternalServices/

```

### **2. Understanding Vertical Slice Architecture**

**Concept**:

- Vertical Slice Architecture is different from the layered approach. Instead of separating the application into horizontal layers (e.g., UI, service, repository), it organizes by feature or functionality.
- Each slice represents a complete feature, containing everything needed (UI, business logic, data access, etc.) for that feature.

**Layers**:

- **Feature Slices**: Each feature is implemented in its entirety, with all the necessary components (e.g., commands, queries, handlers, repositories) encapsulated within that slice.
- **Cross-Cutting Concerns**: Shared logic or utilities (e.g., logging, exception handling) might be placed in separate folders but are minimal.

**Folder Structure Example in C#**:

```css
cssCopy code
src/
├── Features/
│   ├── Orders/
│   │   ├── CreateOrder/
│   │   │   ├── CreateOrderCommand.cs
│   │   │   ├── CreateOrderHandler.cs
│   │   │   ├── CreateOrderValidator.cs
│   │   │   └── OrderDto.cs
│   │   ├── GetOrderDetails/
│   │   │   ├── GetOrderDetailsQuery.cs
│   │   │   ├── GetOrderDetailsHandler.cs
│   │   │   └── OrderDetailsDto.cs
│   └── Products/
│       ├── CreateProduct/
│       │   ├── CreateProductCommand.cs
│       │   ├── CreateProductHandler.cs
│       │   └── ProductDto.cs
│       └── GetProductDetails/
│           ├── GetProductDetailsQuery.cs
│           ├── GetProductDetailsHandler.cs
│           └── ProductDetailsDto.cs
├── Infrastructure/
│   ├── Persistence/
│   └── Logging/
└── Shared/
    └── Utilities/

```

### **3. Key Differences**

- **Architecture Approach**:
  - Clean Architecture: Layered, with dependencies only inward.
  - Vertical Slice: Feature-focused, all relevant code in one slice.
- **Cohesion and Coupling**:
  - Clean Architecture: High cohesion within layers, low coupling across layers.
  - Vertical Slice: High cohesion within slices, minimal cross-slice dependencies.
- **Development and Maintenance**:
  - Clean Architecture: Easier to maintain, especially in large, complex systems.
  - Vertical Slice: Easier to develop features quickly, especially in agile environments.

###

### **Further Reading**

- https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
- https://www.jimmybogard.com/vertical-slice-architecture/
- https://github.com/ardalis/CleanArchitecture
- https://github.com/nadirbad/VerticalSliceArchitecture/tree/main
-
