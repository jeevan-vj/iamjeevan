---
title: 'Integer Division Result in Decimal in SQL server'
date: '2021-09-23'
tags: ['SQL', 'SQL SERVER']
draft: false
summary: 'Get the Decimal result from deviding Integers in SQL Server'
---

# Problem

Get the result in Decimal value by dividing Integer values in SQL Server.

Ex:

```sql
SELECT 5/2
--Actual 2
--Expected 2.5
```

# Resolution

Convert to decimal

```sql
SELECT CONVERT(decimal(4,2), 5) /2
--2.500000
```

Multiplying by 1.0 Converts value into numeric

```sql
SELECT 5*1.0/2
--2.500000
```

Shorthand method `*1.`

```sql
SELECT 5*1./2
--2.500000
```
