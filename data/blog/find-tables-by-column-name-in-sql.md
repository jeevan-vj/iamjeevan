---
title: 'Find Tables by Column names in SQL Server'
date: '2021-12-23'
tags: ['Code-Snippets', 'SQL']
draft: false
summary: 'SQL query to find referencing Tables by column name'
---

# Find Tables by column names
While I was working on large legacy SQL server database I always wanted to find the Tables which has some columns. Below is the query I usually used to find the Tables by Column names.

```sql
SELECT c.name AS ColumnName, t.name AS TableName
FROM sys.columns c
	JOIN sys.tables t ON c.object_id = t.object_id
WHERE c.name LIKE 'column_name';
```