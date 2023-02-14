---
title: 'How to check installed .Net Framework versions in Powershell'
date: '2023-02-15'
tags: ['Powershell', 'Code-Snippets']
draft: false
summary: 'Checking installed .Net frameworks in Powershell'
---

# Problem

Checking installed .Net frameworks in Powershell

# Solution

```powershell
    Get-ChildItem 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP' -Recurse | Get-ItemProperty -Name Version, Release -ErrorAction SilentlyContinue | Where-Object { $_.PSChildName -Match '^(?!S)\p{L}'} | Select-Object PSChildName, Version, Release | Sort-Object Version -Descending

```

This code uses the registry to find the installed versions of .NET Framework. It retrieves information from the HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP key and its subkeys, and then filters and sorts the results to display the most recent version first.

When you run this code, you'll see a list of .NET Framework versions installed on your system, along with their release number. The most recent version should be at the top of the list.

Note that you may need to run this code as an administrator to be able to access the registry and retrieve the necessary information.
