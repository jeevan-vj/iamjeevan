---
title: 'How to check installed .Net Framework versions in Powershell'
date: '2023-02-03'
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
