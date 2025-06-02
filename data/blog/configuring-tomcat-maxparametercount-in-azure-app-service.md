---
title: 'Configuring Tomcat in Azure App Service: Increase maxParameterCount'
date: '2025-06-02'
tags: ['Azure', 'Tomcat', 'Java', 'AppService', 'Configuration']
draft: false
summary: 'A step-by-step guide to increase Tomcat maxParameterCount in Azure App Service to handle large forms and query strings'
---

When hosting Java web applications on Azure App Service using Tomcat, you might encounter issues with legacy Java applications due to the default `maxParameterCount` limit (1000). For legacy applications handling large forms or query strings, this limit can block expected behavior and cause request failures.

In this guide, I'll walk you through a quick and effective way to increase the `maxParameterCount` parameter to 10000 using a custom startup script in Azure App Service.

## Understanding the Problem

By default, Tomcat sets a limit of 1000 parameters that can be processed in a single HTTP request. This includes:

- Form fields in POST requests
- URL parameters in query strings
- Multiple values for the same parameter name

When your application exceeds this limit, Tomcat will ignore additional parameters, potentially breaking your application's functionality without clear error messages.

## Solution: Custom Startup Script

We'll create a startup script that:
1. Modifies the `server.xml` configuration file
2. Updates the `maxParameterCount` value
3. Starts Tomcat with the new configuration

### Step 1: Create a Startup Script

Create a file named `startup.sh` with the following content:

```bash
#!/bin/bash

# Update maxParameterCount from 1000 to 10000 in server.xml
set -e

SERVER_XML="/usr/local/tomcat/conf/server.xml"
NEW_VALUE="10000"

echo "[$(date)] Starting Tomcat configuration update..."

# Backup original file
cp "$SERVER_XML" "${SERVER_XML}.backup"
echo "[$(date)] Backup created."

# Update value
sed -i 's/maxParameterCount="1000"/maxParameterCount="'"$NEW_VALUE"'"/g' "$SERVER_XML"
echo "[$(date)] Updated maxParameterCount to $NEW_VALUE"

# Verify update
if grep -q "maxParameterCount=\"$NEW_VALUE\"" "$SERVER_XML"; then
    echo "[$(date)] Configuration update successful"
else
    echo "[$(date)] ERROR: Update failed, restoring backup"
    cp "${SERVER_XML}.backup" "$SERVER_XML"
    exit 1
fi

# Start Tomcat
echo "[$(date)] Starting Tomcat..."
exec catalina.sh run
```

This script performs the following operations:
- Creates a backup of the original configuration file
- Uses `sed` to replace the default value with our new value
- Verifies the change was successful
- Starts Tomcat with the updated configuration

### Step 2: Configure App Service to Use the Script

1. Navigate to your Azure App Service in the Azure Portal
2. Go to **Configuration** > **General settings**
3. In the **Startup Command** field, enter: `/home/startup.sh`
4. Click **Save**

![Azure App Service Configuration](https://example.com/images/azure-config.png)

## Verification and Testing

After deploying your changes:

1. Check the application logs in **Log stream** to verify the script executed successfully
2. Look for messages like: `[date] Updated maxParameterCount to 10000` and `[date] Configuration update successful`
3. Test your application with a request that contains more than 1000 parameters

## Important Considerations

- Always test configuration changes in a staging slot before deploying to production
- This approach assumes you're using Tomcat on Linux in Azure App Service
- The exact path to `server.xml` may vary depending on your Tomcat version and configuration
- Consider security implications of increasing this limit, as very large requests could potentially be used in DoS attacks

## Conclusion

By implementing this custom startup script, you can easily increase Tomcat's `maxParameterCount` to handle larger requests in your Azure App Service. This approach ensures the configuration is applied consistently each time your application starts, avoiding the need for manual intervention after deployments or service restarts.

For more complex scenarios or additional Tomcat configuration needs, you might consider creating a custom Docker image with your preferred settings pre-configured.
