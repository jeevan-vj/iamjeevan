---
title: 'Delete Millions of Rows in a Table in SQL Server'
date: '2022-03-02'
tags: ['Powershell', 'Code-Snippets']
draft: false
summary: 'Delete Millions of Rows in a Table in SQL Server using'
---

# Problem

Problem: Deleting Millions of Rows at once could causes the following issues.

- Lock Escalation
- Large transaction logs Usage

# Solution

In order to avoid the above issues, we can use batch Delete. Further we can use traction and Commit after each iteration. So, in case something went wrong we don't have to start over.

```sql
  DECLARE @Rows INT,
        @BatchSize INT,
        @Completed INT,
        @Total INT,
        @Message nvarchar(max)


SET @BatchSize = 10000
SET @Rows = @BatchSize
SET @Completed = 0


SELECT CommentId AS id into #targetIds
FROM Comments
WHERE Comments.Month < 202101
ORDER BY  Id



SELECT @Total = @@ROWCOUNT


CREATE TABLE #batchIds (Id INT);


WHILE EXISTS (SELECT 1 FROM #targetIds)
BEGIN


	DELETE TOP (@BatchSize)
    FROM #targetIds
    OUTPUT deleted.Id INTO #batchIds


	  DELETE FROM Comments where Commentid in (select id FROM #batchIds)


    SET @Rows = @@ROWCOUNT


    SET @Completed = @Completed + @Rows


    -- Print progress using RAISERROR to avoid SQL buffering issue
    SELECT @Message = 'Completed ' + cast(@Completed as varchar(10)) + '/' + cast(@Total as varchar(10))
    RAISERROR(@Message, 0, 1) WITH NOWAIT


    TRUNCATE TABLE #batchIds;
END


IF OBJECT_ID(N'tempdb..#batchIds') IS NOT NULL
BEGIN
DROP TABLE  #batchIds
END


IF OBJECT_ID(N'tempdb..#targetIds') IS NOT NULL
BEGIN
DROP TABLE  #targetIds
END
```
