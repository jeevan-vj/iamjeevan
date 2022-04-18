---
title: 'SQL Server Database Partitioning'
date: '2022-04-18'
tags: ['SQL', 'Code-Snippets']
draft: false
summary: 'Partition SQL Server Tables with File Groups'
---

# What is database table partitioning?

By Default Data of a table reside in one filegroup called Primary. Partitioning enables divide large table into units that may be spread across more than one filegroup in a database and offer fast ways to load and remove large amounts of data from a table. By splitting into smaller units, queries that access only a fraction of the data can run faster because there is less data to scan.

## Benefits of Partitioning

- Aid in Maintenance of Large Table

Perform maintenance operations quickly because operations target only subsets of data instead of the whole table.

We can transfer or access subsets of data quickly and efficiently while maintaining the integrity of a data collection.

Ex.
Loading data to the table (ETL)

- Reduce overall response time to read and load data

Queries may be improved as the query might only scan a specific partition or partitions instead of the entire Table.

# Types of Partition

1. Vertical Partition

   The table will be divided into multiple Tables based on columns.

2. Horizontal Partition

   The Table will be divided into multiple with the same number of Columns with a fewer number of rows.

# Create Horizontal partitioning in SQL server.

1. Create Test DB and Test Table

   ```sql
   CREATE DATABASE PartitionTest

   GO

   USE PartitionTest

   CREATE TABLE Orders
       (
         OrderID INT IDENTITY NOT NULL,
         OrderDate DATETIME NOT NULL ,
         OrderMonth INT NOT NULL
       );

   ```

2. Create the partition function

   Create [Partition function](https://docs.microsoft.com/en-us/sql/relational-databases/partitions/partitioned-tables-and-indexes?view=sql-server-ver15#partition-function). Defines the number of Partitions. We need to have a column([Partition Column](https://docs.microsoft.com/en-us/sql/relational-databases/partitions/partitioned-tables-and-indexes?view=sql-server-ver15#partitioning-column)) of Table or index that will be used by partition functions to create and populate partitions. Each value in the partitioning column is an input to the partitioning function, which returns a partition value.

   Partitioning Column (OrderMonth)

   ```
   CREATE PARTITION FUNCTION PartitionByMonth (INT)
   AS RANGE RIGHT
   FOR VALUES (202201, 202202, 202203);
   ```

3. Create File Group

   ```sql
   --Create File Group
   ALTER DATABASE PartitionTest ADD FILEGROUP FGJan
   GO
   ALTER DATABASE PartitionTest ADD FILEGROUP FGFeb
   GO
   ALTER DATABASE PartitionTest ADD FILEGROUP FGMarch
   GO
   ```

4. Add files to the filegroups

   ```sql
   --Create files and attach to File Group
   ALTER DATABASE PartitionTest
   ADD FILE
   (
     NAME = [File_Month_Jan],
     FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\File_Month_Jan.ndf',
       SIZE = 5 MB,
       MAXSIZE = UNLIMITED,
       FILEGROWTH = 10 MB
   ) TO FILEGROUP FGJan

   ALTER DATABASE PartitionTest
   ADD FILE
   (
     NAME = [File_Month_Feb],
     FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\File_Month_Feb.ndf',
       SIZE = 5 MB,
       MAXSIZE = UNLIMITED,
       FILEGROWTH = 10 MB
   ) TO FILEGROUP FGFeb

   ALTER DATABASE PartitionTest
   ADD FILE
   (
     NAME = [File_Month_March],
     FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\File_Month_March.ndf',
       SIZE = 5 MB,
       MAXSIZE = UNLIMITED,
       FILEGROWTH = 10 MB
   ) TO FILEGROUP FGMarch
   ```

5. Create the partition scheme

   ```sql
   --Create the partition scheme
   CREATE PARTITION SCHEME OrdersPS
   	AS PARTITION PartitionByMonth
   	TO ([Primary], FGJan, FGFeb, FGMarch);
   ```

   Here we have to mention all the filegroups including default Primary File Group.

   Query to get available File Groups

   ```sql
   SELECT name AS AvailableFilegroups
     FROM sys.filegroups
     WHERE type = 'FG'
   ```

6. Create/Update Table with Partitioning

   ```sql
   --Create Index
   CREATE CLUSTERED INDEX IX_Orders ON [dbo]. [Orders]
   (
      [OrderMonth]
   )WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON OrdersPS(OrderMonth)
   ```

7. Verify partitions with Row Count

   ```sql
   SELECT p.partition_number AS PartitionNumber,
          f.name             AS PartitionFilegroup,
          p.rows             AS NumberOfRows
   FROM sys.partitions p
            JOIN sys.destination_data_spaces dds ON p.partition_number = dds.destination_id
            JOIN sys.filegroups f ON dds.data_space_id = f.data_space_id
   WHERE OBJECT_NAME(OBJECT_ID) = 'Orders'
   ```

   | PartitionFilegroup | PartitionNumber | NumberOfRows |
   | ------------------ | --------------- | ------------ |
   | PRIMARY            | 1               | 0            |
   | FGJan              | 2               | 0            |
   | FGFeb              | 3               | 0            |
   | FGMarch            | 4               | 0            |

   Insert Test Data

   ```sql
   INSERT INTO PartitionTest.dbo.Orders (OrderDate, OrderMonth)
   VALUES (N'2022-01-18 17:25:05.000', 202201);

   INSERT INTO PartitionTest.dbo.Orders (OrderDate, OrderMonth)
   VALUES (N'2022-02-18 17:25:39.000', 202202);

   INSERT INTO PartitionTest.dbo.Orders (OrderDate, OrderMonth)
   VALUES (N'2022-03-18 17:25:58.000', 202203);
   ```

   We can see rows are distributed among each file groups

   | PartitionFilegroup | PartitionNumber | NumberOfRows |
   | ------------------ | --------------- | ------------ |
   | PRIMARY            | 1               | 0            |
   | FGJan              | 2               | 1            |
   | FGFeb              | 3               | 1            |
   | FGMarch            | 4               | 1            |

## Complete Query

```sql
CREATE DATABASE PartitionTest

GO

USE PartitionTest

CREATE TABLE Orders
(
    OrderID    INT IDENTITY NOT NULL,
    OrderDate  DATETIME     NOT NULL,
    OrderMonth INT          NOT NULL
);

CREATE PARTITION FUNCTION PartitionByMonth (INT)
    AS RANGE RIGHT
    FOR VALUES (202201, 202202, 202203);

--Create File Group
ALTER DATABASE PartitionTest ADD FILEGROUP FGJan
GO
ALTER DATABASE PartitionTest ADD FILEGROUP FGFeb
GO
ALTER DATABASE PartitionTest ADD FILEGROUP FGMarch
GO
--Create files and attach to File Group
ALTER DATABASE PartitionTest
    ADD FILE
        (
            NAME = [File_Month_Jan],
            FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\File_Month_Jan.ndf',
            SIZE = 5 MB,
            MAXSIZE = UNLIMITED,
            FILEGROWTH = 10 MB
            ) TO FILEGROUP FGJan

ALTER DATABASE PartitionTest
    ADD FILE
        (
            NAME = [File_Month_Feb],
            FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\File_Month_Feb.ndf',
            SIZE = 5 MB,
            MAXSIZE = UNLIMITED,
            FILEGROWTH = 10 MB
            ) TO FILEGROUP FGFeb

ALTER DATABASE PartitionTest
    ADD FILE
        (
            NAME = [File_Month_March],
            FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\File_Month_March.ndf',
            SIZE = 5 MB,
            MAXSIZE = UNLIMITED,
            FILEGROWTH = 10 MB
            ) TO FILEGROUP FGMarch

GO

--Create the partition scheme
CREATE PARTITION SCHEME OrdersPS
    AS PARTITION PartitionByMonth
    TO ([Primary],FGJan, FGFeb, FGMarch);

--Create Index
CREATE CLUSTERED INDEX IX_Orders ON [dbo].[Orders]
    (
     [OrderMonth]
        ) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON OrdersPS(OrderMonth)

-- Insert Test Data
INSERT INTO PartitionTest.dbo.Orders (OrderDate, OrderMonth)
VALUES (N'2022-01-18 17:25:05.000', 202201);

INSERT INTO PartitionTest.dbo.Orders (OrderDate, OrderMonth)
VALUES (N'2022-02-18 17:25:39.000', 202202);

INSERT INTO PartitionTest.dbo.Orders (OrderDate, OrderMonth)
VALUES (N'2022-03-18 17:25:58.000', 202203);

-- View File Groups
SELECT name AS AvailableFilegroups
FROM sys.filegroups
WHERE type = 'FG'

-- View Row counts of Partitions
SELECT p.partition_number AS PartitionNumber,
       f.name             AS PartitionFilegroup,
       p.rows             AS NumberOfRows
FROM sys.partitions p
         JOIN sys.destination_data_spaces dds ON p.partition_number = dds.destination_id
         JOIN sys.filegroups f ON dds.data_space_id = f.data_space_id
WHERE OBJECT_NAME(OBJECT_ID) = 'Orders'
```

## References

- [https://www.brentozar.com/sql/table-partitioning-resources/](https://www.brentozar.com/sql/table-partitioning-resources/)
- [https://www.sqlshack.com/database-table-partitioning-sql-server/](https://www.sqlshack.com/database-table-partitioning-sql-server/)
- [https://docs.microsoft.com/en-us/sql/relational-databases/partitions/partitioned-tables-and-indexes?view=sql-server-ver15](https://docs.microsoft.com/en-us/sql/relational-databases/partitions/partitioned-tables-and-indexes?view=sql-server-ver15)
