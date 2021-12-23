---
title: 'Drop all tables in a specific schema'
date: '2021-12-22'
tags: ['Code-Snippets', 'SQL']
draft: false
summary: 'SQL query to Drop tables in a schema'
---

# Find Tables by column names
While I was refactroing a legacy SQL server database I wanted to drop all the tables under a schema. Below is the query I used.

```sql
DECLARE @sql NVARCHAR(max)=''

SELECT @sql += ' Drop table ' + QUOTENAME(TABLE_SCHEMA) + '.'+ QUOTENAME(TABLE_NAME) + '; '
FROM   INFORMATION_SCHEMA.TABLES A
WHERE  TABLE_TYPE = 'BASE TABLE'
and A.TABLE_SCHEMA = 'tmp'


Exec Sp_executesql @sql
```