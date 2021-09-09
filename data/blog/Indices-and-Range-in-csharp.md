---
title: 'Indices and Ranges in C#'
date: '2021-10-11'
tags: ['c#']
draft: false
summary: 'Indices and Ranges in C#'
---

# Indices and Range in C#

Indices and Range provide clear, concise syntax to access a single element or a range of elements in a sequence.

[Official Doc](https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/ranges-indexes)

# Indices

> specifies that an index is relative to the end of sequence.

**^** Index from end operator

Rules for indices

Assume we have array named myArray;

`^0` → `myArray[myArray.Length]`

So, `myArray[^0]` throws exception, just as `myArray[myArray.Length]`;

For any number n, the index ^n is the same as myArray[myArray.Length - n];

Retrieve last element of Array.

`myArray[^1]`

```csharp
   int [] myArray = new int[5] {0,1,2,3,4};

		Console.WriteLine("#-----Indices-----#");

		// last index
		Console.WriteLine(myArray[^1]);
		// second last index
		Console.WriteLine(myArray[^2]);
		// fifth from end
		Console.WriteLine(myArray[^5]);
```

Retrieve second last element of Array:

`myArray[^2]`

Indices as variables.

indices are System.Index Type.

```csharp
    Index last = ^1;
		Console.WriteLine(myArray[last]);

```

String, `Span<T>`, `ReadOnlySpan<T>` and `List<T>` supports indices.

![indices-and-ranges-c-sharp/Untitled.png](/static/images/indices-and-ranges-c-sharp/Untitled.png)

![indices-and-ranges-c-sharp/Untitled%201.png](/static/images/indices-and-ranges-c-sharp/Untitled%201.png)

# Range

> A range specifies the start and end of a range.

Ranges are exclusive, it means the end is not included in the range. **whenever we defined the Range end position is not included in result**.

**..** indicates the range operator.

Indices can be used with range operator

The range `[0..^0]` → `[0..myArray.Length]`;

```csharp
    Console.WriteLine("All the elements: myArray[..]");
		// 0,1,2,3,4
		Console.WriteLine(string.Join(',',myArray[..]));

		Console.WriteLine("0 to ^1. [^1] is not included: myArray[0..^1]");
		// 0,1,2,3
		Console.WriteLine(string.Join(',',myArray[0..^1]));
```

Range as variables.

```csharp
   Range zeroToThird = 0..^1;
		// 0,1,2,3
		Console.WriteLine(string.Join(',',myArray[zeroToThird]));
```

String, `Span<T>`, `ReadOnlySpan<T>` support ranges.

### Fiddle

[https://dotnetfiddle.net/B2fJuL](https://dotnetfiddle.net/B2fJuL)
