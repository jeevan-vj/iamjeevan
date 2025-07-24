---
title: "What is IReadOnlyCollection<T> in .NET?"
date: 2025-07-21
description: "A concise guide to IReadOnlyCollection<T> in .NET. what it is, when to use it, and how it compares to other collection interfaces."
tags: [dotnet, csharp, collections, api-design, ddd]
---

### ✅ What is `IReadOnlyCollection<T>` in .NET?

`IReadOnlyCollection<T>` is an interface in the .NET Framework that represents a **read-only**, **enumerable** collection of elements of type `T`.

It is defined in the `System.Collections.Generic` namespace and looks like this:

```csharp
public interface IReadOnlyCollection<out T> : IEnumerable<T>
{
    int Count { get; }
}
```

So it's essentially:

* A read-only collection (you can't add/remove/modify items).
* You can enumerate it using `foreach`.
* You can get the number of elements via the `Count` property.

---

### 📌 When to Use `IReadOnlyCollection<T>`

Use `IReadOnlyCollection<T>` when:

1. **You want to expose a collection as read-only**:

   * Consumers of your code can read the elements but can't modify them.
   * It enforces immutability at the API boundary.

2. **You want to convey intent clearly**:

   * Using `IEnumerable<T>` only guarantees enumeration.
   * Using `IReadOnlyCollection<T>` adds the `Count` guarantee and communicates the intent that no mutation should happen.

3. **Better than returning `List<T>` or `T[]` directly**:

   * It avoids exposing unnecessary methods like `Add`, `Remove`, etc.
   * Hides the underlying data structure.

---

### ✅ Example

```csharp
public class Order
{
    private readonly List<string> _items = new List<string>();

    public void AddItem(string item)
    {
        _items.Add(item);
    }

    public IReadOnlyCollection<string> Items => _items;
}
```

This ensures that callers of `Order.Items` can:

* See the items.
* Count the items.
* But **not** modify the list (`Add`, `Remove`, etc.).

---

### 🔁 Comparison to Other Interfaces

| Interface                | Can Modify? | Has Count? | Enumerator? | Intent                      |
| ------------------------ | ----------- | ---------- | ----------- | --------------------------- |
| `IEnumerable<T>`         | ❌           | ❌          | ✅           | Enumeration only            |
| `IReadOnlyCollection<T>` | ❌           | ✅          | ✅           | Read-only access with count |
| `ICollection<T>`         | ✅           | ✅          | ✅           | Modifiable collection       |
| `List<T>` / `T[]`        | ✅           | ✅          | ✅           | Concrete mutable collection |

---

### 🧠 Tip

* `IReadOnlyCollection<T>` is especially useful in **public APIs**, **DDD entities/aggregates**, and **library development**, where encapsulation and immutability matter.
* Internally, you can still use a `List<T>` or `HashSet<T>` and expose it as `IReadOnlyCollection<T>`.
