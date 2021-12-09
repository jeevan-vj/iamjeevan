---
title: 'How to batch update millions of record in SQL Server'
date: '2021-10-29'
tags: ['sql server']
draft: false
summary: 'Lets see how we can do the batch update in sql server without killing resources'
---

# Problem

Update a record with millions of records. Sometimes we have to update Table with millions of records joining another table. Ex. ETL . If we try to update at once we may end up with following issues.

1. lock escalation

   More on [MsDoc](https://docs.microsoft.com/en-us/troubleshoot/sql/performance/resolve-blocking-problems-caused-lock-escalation)

2. large transaction logs usage

I'm using [Stackoverflow](https://archive.org/details/stackexchange) DB for this example.

## Create Temp User table for experiments and Move users

```sql
CREATE TABLE [dbo].[Users_Temp](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AboutMe] [nvarchar](max) NULL,
	[Age] [int] NULL,
	[CreationDate] [datetime] NOT NULL,
	[DisplayName] [nvarchar](40) NOT NULL,
	[DownVotes] [int] NOT NULL,
	[EmailHash] [nvarchar](40) NULL,
	[LastAccessDate] [datetime] NOT NULL,
	[Location] [nvarchar](100) NULL,
	[Reputation] [int] NOT NULL,
	[UpVotes] [int] NOT NULL,
	[Views] [int] NOT NULL,
	[WebsiteUrl] [nvarchar](200) NULL,
	[AccountId] [int] NULL,
 CONSTRAINT [PK_Users_Temp_Id] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

-- copy data from Users Table

SET IDENTITY_INSERT [dbo].[Users_Temp] ON

INSERT INTO [dbo].[Users_Temp]
           ([Id]
				   ,[AboutMe]
           ,[Age]
           ,[CreationDate]
           ,[DisplayName]
           ,[DownVotes]
           ,[EmailHash]
           ,[LastAccessDate]
           ,[Location]
           ,[Reputation]
           ,[UpVotes]
           ,[Views]
           ,[WebsiteUrl]
           ,[AccountId])
     SELECT [Id]
		   ,[AboutMe]
           ,[Age]
           ,[CreationDate]
           ,[DisplayName]
           ,[DownVotes]
           ,[EmailHash]
           ,[LastAccessDate]
           ,[Location]
           ,[Reputation]
           ,[UpVotes]
           ,[Views]
           ,[WebsiteUrl]
           ,[AccountId]
		FROM [dbo].[Users]

SET IDENTITY_INSERT [dbo].[Users_Temp] OFF
```

## Update Users_Temp table by joining

```sql
DECLARE @Rows INT,
        @BatchSize INT,
        @Completed INT,
        @Total INT,
        @Message nvarchar(max)

SET @BatchSize = 1000
SET @Rows = @BatchSize
SET @Completed = 0

SELECT Id AS id into #targetIds
FROM Users_Temp
ORDER BY  Id

SELECT @Total = @@ROWCOUNT

CREATE TABLE #batchIds (Id INT);

WHILE EXISTS (SELECT 1 FROM #targetIds)
BEGIN

	DELETE TOP (@BatchSize)
    FROM #targetIds
    OUTPUT deleted.Id INTO #batchIds

	Update  ut SET DisplayName = u.DisplayName
	FROM Users_Temp ut
    JOIN #batchIds tmp ON ut.Id = tmp.Id
	JOIN Users u
		ON u.id = ut.id

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

Reference:
- [Stackoverflow](https://stackoverflow.com/a/66792237/2260875)
- [BrentOzar](https://www.brentozar.com/archive/2020/12/how-to-batch-updates-a-few-thousand-rows-at-a-time/)
