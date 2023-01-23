---
title: 'Argument data type ntext is invalid for argument 1 of len function'
date: '2023-01-24'
tags: ['SQL-Server']
draft: false
summary: 'Argument data type ntext is invalid for argument 1 of len function'
---

# Problem

The error message "Argument data type ntext is invalid for argument 1 of len function" occurs when you are trying to use the LEN() function on a column or variable of data type ntext in SQL Server. The LEN() function only works on data types nvarchar and varchar.

To solve this error, you can either convert the data type of the column or variable to nvarchar or varchar using the CAST() or CONVERT() function, or you can use the DATALENGTH() function instead of LEN() function.

Here is an example of how to use the CAST() function to convert the data type of a column called "ntext_column" to nvarchar before using the LEN() function:

Solution 1

```sql

DECLARE @ntext_column ntext

SET @ntext_column = 'example'

DECLARE @length INT
SET @length = LEN(CAST(@ntext_column AS nvarchar(max)))

PRINT @length


```

Alternatively, here is an example of how to use the DATALENGTH() function to get the number of bytes used to represent an ntext column:

Solution 2

```sql


DECLARE @ntext_column ntext

SET @ntext_column = 'example'

DECLARE @length INT
SET @length = DATALENGTH(@ntext_column)

PRINT @length


```

Note that DATALENGTH returns the number of bytes used to represent the data, whereas LEN returns the number of characters. If you are dealing with multi-byte characters (such as unicode), then DATALENGTH will give you the correct length while LEN may not.

:)
