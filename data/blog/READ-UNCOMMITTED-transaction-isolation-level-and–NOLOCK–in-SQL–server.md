---
title: 'READ UNCOMMITTED transaction isolation level and NOLOCK in SQL server'
date: '2021-10-11'
tags: ['sql', 'SQL server']
draft: false
summary: 'READ UNCOMMITTED transaction isolation level and NOLOCK in SQL server'
---

# READ UNCOMMITTED transaction isolation level and NOLOCK in SQL server

Status: In progress

# Overview

I was working on a long-running query that will read data from a SQL DB. When other queries are running it slows down my query due to other transactions.

My Query can afford dirty reads as it was a reporting query. I had two options

- NOLOCK hint
- Setting Transaction isolation to read UNCOMMITTED `SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;`

# READ UNCOMMITTED

Specifies that statements can read rows that have been modified by other transactions but not yet committed.

[DOC](https://docs.microsoft.com/en-us/sql/t-sql/statements/set-transaction-isolation-level-transact-sql?redirectedfrom=MSDN&view=sql-server-ver15#arguments)

- Do not issue shared locks to prevent other transactions from modifying data read by the current transaction.
- READ UNCOMMITTED transactions are also not blocked by exclusive locks that would prevent the current transaction from reading rows that have been modified but not committed by other transactions.
- This option has the same effect as setting NOLOCK on all tables in all SELECT statements in a transaction
- This is the least restrictive of the isolation levels.

# NOLOCK

`NOLOCK` Is equivalent to `READ UNCOMMITTED`

# Demonstration

I use Stackoverflow DB for this Demo. Consider `PostType` Table.

```sql
SELECT * FROM [dbo].[PostTypes]
```

![Untitled](/static/images/READ-UNCOMMITTED-transaction-isolation-level-and–NOLOCK–in-SQL–server/Untitled.png)

Update Command without Commit or Rollback in Transaction

```sql
BEGIN TRAN
UPDATE PostTypes SET Type = 'Question Updated'
WHERE Id = 1
```

Now try to read the data from `PostTypes` Table.

```sql
SELECT * FROM [dbo].[PostTypes]
```

Query never completes due to uncommitted UPDATE command. We can see the query is blocked by running `sp_who2`

```sql
sp_who2
```

![Untitled](/static/images/READ-UNCOMMITTED-transaction-isolation-level-and–NOLOCK–in-SQL–server/Untitled%201.png)

We have to Stop the `Select` command or `Rollback` or `Commit` the Update transaction.

Using the NOLOCK

```sql
SELECT  * FROM [dbo].[PostTypes] WITH(NOLOCK)
```

Set transaction isolation level to READ UNCOMMITTED

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

SELECT * FROM [dbo].[PostTypes]
```

This will SET Transaction Isolation Level to READ UNCOMMITTED for the session. This is useful when you need to set the Isolation level for the whole query.

Using the above methods we can get the results even though if any uncommitted transactions.

Keep in mind this will enable dirty reads. So, we can only use this method only when dirty reads are acceptable.

# View Isolation level

```bash
DECLARE   @UserOptions TABLE(SetOption varchar(100), Value varchar(100))
DECLARE   @IsolationLevel varchar(100)

INSERT    @UserOptions
EXEC('DBCC USEROPTIONS WITH NO_INFOMSGS')

SELECT    @IsolationLevel = Value
FROM      @UserOptions
WHERE     SetOption = 'isolation level'

PRINT     @IsolationLevel
```
