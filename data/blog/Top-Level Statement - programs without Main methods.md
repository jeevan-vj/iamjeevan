---
title: 'Top-Level Statement - programs without Main methods in C#'
date: '2021-09-25'
tags: ['c#']
draft: false
summary: 'Write C# programs without Main method'
---

# Top-Level Statement - programs without Main methods

C# 9’s top-level statements let you avoid the baggage of a static Main method and a containing class.
A file with top-level statements comprises three parts, in this order:

1. (Optionally) using directives
2. A series of statements, optionally mixed with method declarations
3. (Optionally) Type and namespace declarations

Top Level Statement let us write simple programms like Utilities such as Azure function and github Actions.

When we need to try some logic in c# we can take help of the Top-Level statement. We can get started with this and refactor the code when we adding more features to code for maintainability.

# Rules

1. Only one Top-Level Statement is allowed in the application as there should be one entry point.
2. No other Entry points. We can introduce explicit `Main` method. But those can not act as Entry points. We can use [`-main`](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/advanced#mainentrypoint-or-startupobject) Compiller options.

# Access Parametrs

We can use magic `args` to access parameters.
If nor Command-Line arguments are passed then length of`args` is `0`. It won't be `null`;

```c#
if (args.Length > 0)
{
    foreach (var arg in args)
    {
        Console.WriteLine($"Argument={arg}");
    }
}
else
{
    Console.WriteLine("No arguments");
}
```

# `await`

We can use `await` and call async methods.

```c#
await AsyncMethod()
```

# Classes and Namespaces

After Top_Level statements we can defince namespaces and type definitions.

```c#
using System;
Console.WriteLine("Hello World!");
TestClass.TestMethod();
MyNamespace.MyClass.MyMethod();

public class TestClass
{
    public static void TestMethod()
    {
        Console.WriteLine("Hello from TestMethod");
    }
}


namespace MyNamespace
{
    class MyClass
    {
        public static void MyMethod()
        {
            Console.WriteLine("Hello World from MyNamespace.MyClass.MyMethod!");
        }
    }
}

```

# Exit Coode

We are allowed to use `return`

Because the CLR doesn’t explicitly support top-level statements, the compiler translates your code into something like this:

```c#
using System;                           // Part 1

static class Program$   // Special compiler-generated name
{
   static void Main$()   // Special compiler-generated name
   {
     Console.WriteLine ("Hello, world");     // Part 2
      TestClass.TestMethod();
      MyNamespace.MyClass.MyMethod();          // Part 2
  }
 }

class TestClass { ... }                 // Part 3
namespace MyNamespace { ... }         // Part 3

```

## Reference

[MS DOC](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)
