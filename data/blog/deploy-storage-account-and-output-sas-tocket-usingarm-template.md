---
title: 'Deploy storage account and output connection string with SAS token using ARM template'
date: '2019-10-29'
tags: ['azure', 'arm-template']
draft: false
summary: 'Deploy Azure storage account with a blob container and generate connection string with SAS token and update one of the web app’s settings with generated connection strings.'
---

I found my self in a situation where I needed to deploy Azure storage account with a blob container and generate connection string with SAS token and update one of the web app's settings with generated connection strings.

For this purpose, I used linked ARM template and created Storage account and blob container and generated the connection string with SAS token and output from that template so that master template can use this value.

### Table of content

1. [Craft ARM Template](#craftarm)
2. [Output connection string with SAS token](#conwithsas)
3. [Output connection string with account key](#conwithkey)
4. [Deploy Template](#deployarmtemplate)

## Craft arm template

We need to Craft ARM template as below for our requirement.

```json
{
  "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "variables": {
    "storageAccountApiVersion": "2018-07-01",
    "storageAccountNameTidy": "[toLower(trim(parameters('storageAccountName')))]",
    "blobEndPoint": "[concat('https://&#39;,variables('storageAccountNameTidy'),'.blob.core.windows.net/')]"
  },
  "parameters": {
    "location": {
      "type": "string",
      "defaultValue": "southeastasia"
    },
    "storageAccountName": {
      "type": "string",
      "defaultValue": "awesomestorage"
    },
    "accountType": {
      "type": "string",
      "defaultValue": "Standard_LRS"
    },
    "accessTier": {
      "type": "string",
      "defaultValue": "Hot"
    },
    "supportsHttpsTrafficOnly": {
      "type": "bool",
      "defaultValue": true
    },
    "sasTokenExpiry": {
      "type": "string",
      "defaultValue": "2020-12-31T23:59:00Z"
    },
    "containerName": {
      "type": "string",
      "defaultValue": "test"
    },
    "accountSasProperties": {
      "type": "object",
      "defaultValue": {
        "signedServices": "b",
        "signedPermission": "rl",
        "signedResourceTypes": "sco",
        "keyToSign": "key2",
        "signedExpiry": "[parameters('sasTokenExpiry')]"
      }
    }
  },
  "resources": [
    {
      "name": "[parameters('storageAccountName')]",
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "[variables('storageAccountApiVersion')]",
      "location": "[parameters('location')]",
      "properties": {
        "accessTier": "[parameters('accessTier')]",
        "supportsHttpsTrafficOnly": "[parameters('supportsHttpsTrafficOnly')]"
      },
      "dependsOn": [],
      "sku": {
        "name": "[parameters('accountType')]"
      },
      "kind": "BlobStorage",
      "resources": [
        {
          "name": "[concat('default/', parameters('containerName'))]",
          "type": "blobServices/containers",
          "apiVersion": "[variables('storageAccountApiVersion')]",
          "dependsOn": ["[parameters('storageAccountName')]"]
        }
      ]
    }
  ],
  "outputs": {
    "storageAccountConnectionString": {
      "type": "string",
      "value": "[concat('DefaultEndpointsProtocol=https;AccountName=', variables('storageAccountNameTidy'), ';AccountKey=', listKeys(resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountNameTidy')), variables('storageAccountApiVersion')).keys[0].value)]"
    },
    "storageAccountConnectionStringWithSAS": {
      "type": "string",
      "value": "[concat('BlobEndpoint=',variables('blobEndPoint'),';SharedAccessSignature=', listAccountSas(variables('storageAccountNameTidy'), variables('storageAccountApiVersion'), parameters('accountSasProperties')).accountSasToken)]"
    }
  }
}
```

## generate connection string with sas token

As per the above full ARM Template, we can see connection string is generated with full access and another is generated with SAS token.

In order to generate a connection string with SAS token, I have used `listAccountSas` ARM function.

Find More details on this function [here](https://docs.microsoft.com/en-us/rest/api/storagerp/storageaccounts/listaccountsas)

```json
"storageAccountConnectionStringWithSAS": { "type": "string", "value": "[concat('BlobEndpoint=',variables('blobEndPoint'),';SharedAccessSignature=', listAccountSas(variables('storageAccountNameTidy'), variables('storageAccountApiVersion'), parameters('accountSasProperties')).accountSasToken)]" }
```

We need to pass three parameters for this function

- resourceIdenifier

The name of the storage account within the specified resource group

- apiVersion

The API version to use for this operation

- requestParameters

We need to pass parameters as specified [here](https://docs.microsoft.com/en-us/rest/api/storagerp/storageaccounts/listaccountsas#request-body)

```json
"accountSasProperties": {
            "type": "object",
            "defaultValue": {
                "signedServices": "b",
                "signedPermission": "rl",
                "signedResourceTypes": "sco",
                "keyToSign": "key2",
                "signedExpiry": "[parameters('sasTokenExpiry')]"
            }
        }
```

We can find more details about parameters specified herein above Microsoft documentation.

## Generate connection string with storage account key

We can generate connection string which has full access to storage account with Storage account access keys.  We can use `listKeys` ARM function for this.

We can find more details on this function [here.](https://docs.microsoft.com/en-us/rest/api/storagerp/storageaccounts/listkeys)

We need to pass two parameters for this function

- Storage account resource id
- API version

This function gives you all keys in the storage account and we can select one key to create connection string as below.

```json
listKeys(
  resourceId("Microsoft.Storage/storageAccounts", variables("storageAccountNameTidy")),
  variables("storageAccountApiVersion")
).keys[0].value
```

## Deploy ARM template

We can use the following PowerShell script to deploy ARM template.

Note: Fill out the required parameters. (denotes in caipatal)

```powershell

$password = "SECRET"
$clientId = "CLIENTID"
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$credentials = New-Object System.Management.Automation.PSCredential ($clientId, $securePassword)
Login-AzureRmAccount -ServicePrincipal -TenantId "TENANTID" -SubscriptionId "SUBSCRIPTIONID" -Credential $credentials


$templateFilePath = "ARM TEMPLATE PATH"

$resourceGroupName = "RESOURCEGROUPNAME"
$resourceGroupLocation = "LOCATION"
$deploymentName = "DEPLOYMENTNAME"

#Create or check for existing resource group
$resourceGroup = Get-AzureRmResourceGroup -Name $resourceGroupName -ErrorAction SilentlyContinue
if(!$resourceGroup)
{
    Write-Host "Resource group '$resourceGroupName' does not exist. To create a new resource group, please enter a location.";
    if(!$resourceGroupLocation) {
        $resourceGroupLocation = Read-Host "resourceGroupLocation";
    }
    Write-Host "Creating resource group '$resourceGroupName' in location '$resourceGroupLocation'";
    New-AzureRmResourceGroup -Name $resourceGroupName -Location $resourceGroupLocation
}
else{
    Write-Host "Using existing resource group '$resourceGroupName'";
}


# Start the deployment
Write-Host "Starting deployment...";
New-AzureRmResourceGroupDeployment -ResourceGroupName $resourceGroupName -Name $deploymentName -TemplateFile $templateFilePath;
```

We can see the following output once deployment is successful.
![deploy-storage-account-and-output-sas-tocket-usingarm-template/armblobcon.jpg](/static/images/deploy-storage-account-and-output-sas-tocket-usingarm-template/armblobcon.jpg)

So this is how we deploy storage account and generate connection strings. :)
