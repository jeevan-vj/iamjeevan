---
title: 'Managing Multiple Java Versions in Azure DevOps Pipeline on Windows Server 2019 with Visual Studio 2019 Build Agent'
date: '2024-06-21'
tags: ['Azure Devops', 'Java', 'Devops']
draft: false
summary: 'How to use multiple Java versions in an Azure DevOps pipeline with a Windows Server 2019 and Visual Studio 2019 build agent'
---

## Problem:

The default Java version of Windows Server 2019 with Visual Studio 2019 is Java 8. So, when we need to build a Java application with Java 21 we need to use Java 21 in the build server.

## Resolution:

Windows Server 2019 with Visual Studio 2019 server image already has following Java versions.

Source: https://github.com/actions/runner-images/blob/main/images/windows/Windows2019-Readme.md

| Version             | Environment Variable |
| ------------------- | -------------------- |
| 8.0.412+8 (default) | JAVA_HOME_8_X64      |
| 11.0.23+9           | JAVA_HOME_11_X64     |
| 17.0.11+9           | JAVA_HOME_17_X64     |
| 21.0.3+9.0          | JAVA_HOME_21_X64     |

In the Azure Devops pipeline YAML file, we need to set Java 21.

```yaml
 - script: |
          echo "##vso[task.setvariable variable=JAVA_HOME]$(JAVA_HOME_21_X64)"
          echo "##vso[task.setvariable variable=PATH]$(JAVA_HOME_21_X64)\bin;$(PATH)"
          java -version
        displayName: "Set JDK to 21"
```

This enables us to use Java 21. Further, we can use parameters to allow multiple java versions to used.

Further, if we are using the Maven build task we need to explicitly mention the jdkVersion as input parameter to Maven Action.

ex.

```yaml
 - task: Maven@3
        displayName: 'Maven pom.xml'
        inputs:
          mavenPomFile: 'pom.xml'
          goals: 'clean verify -P ${{parameters.environment}}'
          javaHomeOption: 'JDKVersion'
          jdkVersionOption: '1.21'
          jdkArchitectureOption: 'x64'
          publishJUnitResults: false
          mavenAuthenticateFeed: true
```

## References

https://github.com/microsoft/azure-pipelines-tasks/issues/19131

https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/maven-v3?view=azure-pipelines

https://sourcegraph.com/github.com/apache/flink/-/blob/tools/azure-pipelines/jobs-template.yml?L66:19-66:54
