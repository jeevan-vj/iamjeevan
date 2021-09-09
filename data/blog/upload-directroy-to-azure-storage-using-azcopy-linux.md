---
title: 'Upload directory to Azure Storage using AzCopy in linux'
date: '2021-09-10'
tags: ['Azure', 'AzCopy', 'Linux']
draft: false
summary: 'Upload directory to Azure Storage using AzCopy in linux'
---

# Linux Azcopy directory

# Overview

Recently I was in a situation where I need to copy multiple directories in to Azure storage. So, following is the steps I followed to copy into azure storage. Normally I use `azcopy` when it comes to copy files to azure storage.

# Install AzCopy on Linux

```sql
#Download AzCopy
wget https://aka.ms/downloadazcopy-v10-linux

#Expand Archive
tar -xvf downloadazcopy-v10-linux

#(Optional) Remove existing AzCopy version
sudo rm /usr/bin/azcopy

#Move AzCopy to the destination you want to store it
sudo cp ./azcopy_linux_amd64_*/azcopy /usr/bin/
```

# Authenticate AzCopy

When it comes to authenticate Azcopy we have two options as below. I picked the authenticate vis SAS token

## Using Azure AD

By using Azure Active Directory, we can provide credentials once instead of having to append SAS token each command.

[MsDoc](https://docs.microsoft.com/en-gb/azure/storage/common/storage-use-azcopy-authorize-azure-active-directory)

## Using SAS token

I picked the [SAS token](https://docs.microsoft.com/en-gb/azure/storage/common/storage-sas-overview) and used the command as below.

By running below command which uses SAS token will copy directory to Azure storage.

```bash
azcopy copy "/home/app/public_html/storage/documents" "https://account.blob.core.windows.net/mycontainer1/?sv=2018-03-28&ss=bjqt&srt=sco&sp=rwddgcup&se=2019-05-01T05:01:17Z&st=2019-04-30T21:01:17Z&spr=https&sig=MGCXissyEzbtttkr3ewJIh2AR8KrghSy1DGM9ovN734bQF4%3D" --recursive=true
```
