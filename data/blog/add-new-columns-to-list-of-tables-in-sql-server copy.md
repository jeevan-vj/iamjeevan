---
title: 'Powershell Read CSV file and out pull json file'
date: '2023-01-22'
tags: ['Powershell']
draft: false
summary: 'Reading a CSV file and outputting its contents as a JSON file using PowerShell.'
---

# Problem

Reading a CSV file and outputting its contents as a JSON file using PowerShell.

Solution

```powershell
$csv = Import-Csv -Path "input.csv" -Delimiter "," -Header "Name", "Configuration"

$json = @()

foreach ($row in $csv) {
    $config = $row.Configuration
    $name = $row.Name
    $subjectPattern = [regex]::Match($config, "SubjectPattern=([^;]*);").Groups[1].Value
    $attachmentFileNamePattern = [regex]::Match($config, "AttachmentFileNamePattern=([^;]*);").Groups[1].Value
    $autoProcessDataFolderPath = [regex]::Match($config, "AutoProcessDataFolder=([^;]*);").Groups[1].Value
    $toAddressPattern = [regex]::Match($config, "ToAddressPattern=([^;]*);").Groups[1].Value

    $json += @{
        Name = $name
        SubjectFilter = $subjectPattern
        AttachementFileNameFilter = $attachmentFileNamePattern
        FilePath = $autoProcessDataFolderPath
        ToFilter = $toAddressPattern
    }
}

$json | ConvertTo-Json | Out-File "output.json"
```

:)
