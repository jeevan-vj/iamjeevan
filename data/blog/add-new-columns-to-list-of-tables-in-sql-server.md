---
title: 'Add new Columns to List of Tables in SQL Server'
date: '2021-09-28'
tags: ['SQL-Server']
draft: false
summary: 'Introduce new columns to Existing List of Tables in SQL server from a query.'
---

# Problem

Add Columns to all/list of Tables. Sometimes we found our self in situations where we need to introduce new columns to a list of tables at once. 

ex: `Adding Created_Date`, `Created_UserId`

Solution

```sql
DECLARE @sql NVARCHAR(max)=''

SELECT @sql +=  'ALTER TABLE ' + QUOTENAME(st.name) + ' ADD Created_Date DATETIME NULL, Created_UserId INT NULL, Updated_Date DATETIME NULL, Updated_UserId INT NULL ; '
FROM sys.tables st
INNER JOIN sys.schemas ss on st.[schema_id] = ss.[schema_id]
WHERE st.is_ms_shipped = 0
and ss.name = 'dbo'

BEGIN TRY

Exec Sp_executesql @sql

END TRY
BEGIN CATCH
      PRINT 'Error during Adding Columns';
END CATCH;
```

:) 