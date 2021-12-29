---
title: 'The specified DSN contains an architecture mismatch between the Driver and Application'
date: '2021-12-29'
tags: ['.Net', 'Fixes-for-Errors']
draft: false
summary: 'Fixing the issue of  Error System.Data.Odbc.OdbcException ERROR [IM014] [Microsoft][ODBC Driver Manager] The specified DSN contains an architecture mismatch between the Driver and Application  '
---

# Overview. 

I was working on a application that uses ODBC data source connections. While I was setting up ODBC connection in new server encountered following Error. 

Error

```
Error System.Data.Odbc.OdbcException ERROR [IM014] [Microsoft][ODBC Driver Manager] The specified DSN contains an architecture mismatch between the Driver and Application
```

## Root Cause: 

My application archtecture is 64 bit and I have configured 32 bit ODBC data source connections. 

## Resolution. 

Configure ODBC connections in 64 bit configurations.

Start → ODBC Data Source Administrator (64-bit) → Configure datasources

## Related Links
- [Stack overflow](https://stackoverflow.com/questions/8895823/the-specified-dsn-contains-an-architecture-mismatch-between-the-driver-and-appli)
