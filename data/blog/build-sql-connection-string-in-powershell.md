
---
title: 'Build SQL connection string in powershell'
date: '2021-11-16'
tags: ['Powershell', 'Code-Snippets']
draft: false
summary: 'Build SQL connection string in powershell using SqlConnectionStringBuilder'
---
#Problem
Build SQL connection string in powershell

#Solution

```powershell
   $Server = "localhost"
    $Database = "TestDB"
    $UserName = "user"
    $Password = "@Passpowrd"

    $builder = [System.Data.SqlClient.SqlConnectionStringBuilder]::new()

    $builder.Server = $Server
    $builder.Database = $Database
    $builder.'User ID' = $UserName
    $builder.Password = $Password
    
    $result = $builder.ConnectionString

    Write-Host "Result: $result"
```