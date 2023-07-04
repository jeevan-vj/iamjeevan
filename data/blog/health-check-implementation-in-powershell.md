---
title: 'Implement health check n Powershell'
date: '2021-09-28'
tags: ['Powershell']
draft: false
summary: 'Health check implementation in Powershell.'
---

# Problem

It is quite common requirement that we need to implement web application health checks to make sure our apps are healthy. Recently I found my self implmenting CI/CD pipeline with health checks for API. Here is simple Powershell function to check health check.

Solution

```sql
$url = "https://api.healthcheck"  # Replace with your desired URL
$maxRetryCount = 3            # Maximum number of retries
$retryDelaySec = 5            # Delay between retries in seconds

function Check-UrlHealth {
    param(
        [string]$Url
    )

    $retryCount = 0
    $success = $false

    do {
        try {
            $response = (Invoke-WebRequest -Uri $url -UseBasicParsing)
	        $statusCode = $response.StatusCode
            Write-Host "Endpoint returned status '$statusCode'"
            if ($statusCode -eq 200) {
                $success = $true
                Write-Host "Health check successful for $Url"
            } else {
                Write-Host "Health check failed for $Url. Status code: $statusCode"
            }
        } catch {
            Write-Host "An error occurred during health check for $Url"
            Write-Host $_.Exception.Message

            if ($retryCount -lt $maxRetryCount) {
                Write-Host "Retrying in $retryDelaySec seconds..."
                Start-Sleep -Seconds $retryDelaySec
            }
        }
    }
    while (($success -ne $TRUE) -and (++$retryCount -lt $maxRetryCount))


    if (-not $success) {
        Write-Host "Health check failed after $maxRetryCount attempts."
    }
}

# Call the function to check the URL health
Check-UrlHealth -Url $url
```

:)
