---
title: 'Find Database size in SQL'
date: '2021-12-21'
tags: ['Code-Snippets', 'SQL']
draft: false
summary: 'SQL query to find database size'
---

# Find Tables by column names
I was in a situation where I need to quicly check the Database size. Usuall I use following quries to see the DB sizes

## Query 1
```sql
with CteDbSizes
as
(
    select database_id, type, size * 8.0 / 1024 size
    from sys.master_files
)
select 
    dbFileSizes.[name] AS DatabaseName,
    (select sum(size) from CteDbSizes where type = 1 and CteDbSizes.database_id = dbFileSizes.database_id) LogFileSizeMB,
    (select sum(size) from CteDbSizes where type = 0 and CteDbSizes.database_id = dbFileSizes.database_id) DataFileSizeMB
from sys.databases dbFileSizes ORDER BY DataFileSizeMB desc
```

## Query 2
```sql
exec sp_spaceused
```