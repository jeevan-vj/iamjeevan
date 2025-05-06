---
title: 'How to Show a Maintenance Page in Azure App Service During Deployment'
date: '2025-05-06'
tags: ['Azure', 'DevOps', 'App-Service']
draft: false
summary: 'Using app_offline.htm to display a maintenance page during Azure App Service deployments'
---

# Problem

When deploying to Azure App Service, users may see broken pages or errors during the deployment process. There is no built-in mechanism to show a maintenance page automatically during deployments.

## Example

You need to deploy updates to your web application hosted in Azure App Service without exposing users to a partially deployed or non-functional website.

# Solution

Azure App Service supports a special file named `app_offline.htm`. When this file exists in the web root directory, the App Service runtime will show this file for all incoming HTTP requests while taking the application offline.

```html
<!-- app_offline.htm -->
<!DOCTYPE html>
<html>
<head>
    <title>Maintenance</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            line-height: 1.6;
        }
        h1 {
            color: #0078d4;
        }
    </style>
</head>
<body>
    <h1>We'll be back soon!</h1>
    <p>We're currently performing scheduled maintenance. Please check back later.</p>
</body>
</html>
```

## Deploying app_offline.htm

1. Upload `app_offline.htm` to your web root directory (`/home/site/wwwroot`) before deployment
2. Deploy your application
3. Remove `app_offline.htm` when the deployment is complete

You can do this manually via Kudu (Advanced Tools) or using Azure CLI:

```bash
# Connect to your App Service
az webapp create-remote-connection --resource-group <RG> --name <AppName>

# Then use SFTP to upload the file
```

## Automating in CI/CD Pipelines

In Azure DevOps, you can use the built-in flag in the App Service deployment task:

```yaml
- task: AzureRmWebAppDeployment@4
  inputs:
    ConnectionType: 'AzureRM'
    azureSubscription: '<Your Subscription>'
    appType: 'webApp'
    WebAppName: '<AppName>'
    packageForLinux: '$(System.DefaultWorkingDirectory)/drop/*.zip'
    TakeAppOfflineFlag: true
```

## Result

When deploying with `app_offline.htm`:
- All users will see the maintenance page
- Your application will be safely shut down during deployment
- Once deployment completes and the file is removed, the app automatically restarts

For zero-downtime deployments in production environments, consider using Blue-Green/Canary/Deployment Slots instead of the `app_offline.htm` approach.

Happy Coding :)