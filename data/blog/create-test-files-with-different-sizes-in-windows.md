---
title: 'Create Test files with different sizes in windows'
date: '2023-06-28'
tags: ['Windows', 'CMD']
draft: false
summary: 'Creating test files of different sizes in Windows is essential for various purposes, such as testing storage devices or evaluating application performance. This blog post guides you through simple techniques to generate test files of specific sizes using built-in Windows tools, ensuring efficient testing and analysis without relying on third-party software.'
---

## Using fsutil command

To create a 10MB file using `fsutil` in Windows, you can follow these steps:

1. Open the Command Prompt by typing "cmd" in the search bar and selecting the "Command Prompt" app.
2. Use the `fsutil` command with the `file createnew` option, specifying the desired file size in bytes.

   ```
   fsutil file createnew C:\\path\\to\\example.txt 10485760

   ```

   The size specified is in bytes. In this case, 10MB is equivalent to 10,485,760 bytes (1024 bytes = 1KB, and 1024KB = 1MB).

3. Replace `"C:\\path\\to\\example.txt"` with the actual path and filename where you want to create the file.

After executing the command, a file named "example.txt" will be created with a size of 10MB at the specified location.

Please note that `fsutil` is a built-in Windows utility, and the above steps assume that it is available on your system.

## Using PowerShell

PowerShell code to create a file of a specific size:

```
powershellCopy code
# Specify the file path and size
$filePath = "C:\path\to\example.txt"
$fileSizeInBytes = 1GB  # Change this value to the desired file size

# Create the file
$fileStream = [System.IO.File]::Create($filePath)
$fileStream.SetLength($fileSizeInBytes)
$fileStream.Close()

```

In this code, we use the **`[System.IO.File]::Create()`** method to create the file, and then we set its length to the desired size using the **`SetLength()`** method. Make sure to replace **`"C:\path\to\example.txt"`** with the actual path and filename you want to use, and adjust the **`$fileSizeInBytes`** variable to the desired file size in bytes.
