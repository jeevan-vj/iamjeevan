---
title: 'Aggregate Product in SQL Server'
date: '2022-08-08'
tags: ['SQL', 'Code-Snippets']
draft: false
summary: 'Calculate Product in SQL server'
---

# Problem

Calculate `PRODUCT` aggregate. Multiplication of values of a column in a result set. Similar to how `SUM`, `AVG` aggregate function works. There is no out-of-the-box function for the Product calculation.

## Example

Calculate Product(Multiplication) of `[Value]` grouping by `[CategoryId]` for the following Table.

```sql
DECLARE @Temp_Table ASTABLE
(
                           [Value]float,
                           [CategoryId]int
)

INSERT INTO @Temp_Table (Id, Value, CategoryId)
VALUES (1, 1),
       (2, 1),
       (3, 1),
       (1, 2),
       (2, 2),
       (3, 3),
       (3, 3)
```

### Expected Result Set

| CategoryId |            |
| :--------- | :--------- |
| 1          | 6(1\*2\*3) |
| 2          | 2(1\*2)    |
| 3          | 9(3\*3)    |

# Solution

```sql
SELECT CategoryId,
       ROUND(Exp(Sum(IIf([Value]=0,0,Log([Value]))))*IIf(Min([Value])=0,0,1),2)
FROM @Temp_Table
GROUP BY  CategoryId
```

## Result

| CategoryId |     |
| :--------- | :-- |
| 1          | 6   |
| 2          | 2   |
| 3          | 9   |

Happy Coding :)
