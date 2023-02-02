---
title: 'Exporting Data to CSV using SQL Query and PowerShell'
date: '2023-02-03'
tags: ['Powershell', 'Code-Snippets']
draft: false
summary: 'PowerShell is a powerful scripting language that can be used to automate various administrative tasks, including data management and analysis. In this article, we will show you how to export data from a SQL database to a CSV file using a SQL query and the command-line tool.'
---

# Problem

Exporting Data to CSV using SQL Query and PowerShell

# Solution

```powershell
    $sqlConnection = New-Object System.Data.SqlClient.SqlConnection
    $sqlConnection.ConnectionString = "Server=YourServerName;Database=YourDBName;Integrated Security=True"
    $sqlConnection.Open()
    $sqlCmd = New-Object System.Data.SqlClient.SqlCommand
    $sqlCmd.CommandText = "YOUR SQL QUERY HERE"
    $sqlCmd.Connection = $sqlConnection
    $dataAdapter = New-Object System.Data.SqlClient.SqlDataAdapter
    $dataAdapter.SelectCommand = $sqlCmd
    $dataSet = New-Object System.Data.DataSet
    $dataAdapter.Fill($dataSet)
    $sqlConnection.Close()
    $dataSet.Tables[0] | Export-Csv -Path "C:\Path\To\Your\File.csv" -NoTypeInformation
```
