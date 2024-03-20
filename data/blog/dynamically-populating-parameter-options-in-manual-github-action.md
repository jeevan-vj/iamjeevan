---
title: 'Dynamically Populating Parameters in Manual GitHub Action'
date: '2024-03-20'
tags: ['Git', 'Github', 'Github Action']
draft: false
summary: 'How to dynamically populate option values in manual GitHub Action parameters. It uses a GitHub Action designed to update the YAML file of the main action whenever changes are pushed to the branch. It also uses a script to read the current parameter values, compare them to the dynamic values, and update the YAML file if they differ. This strategy allows for real-time updates and dynamic population of choice parameters in your GitHub Actions.'
---

### Overview

When manually running a GitHub Action with configured choice parameters, it's ideal to have the values dynamically generated and displayed in a drop-down menu. This can be accomplished by creating a GitHub Action that updates the parameters in the YAML file of the main action whenever changes are pushed.

### GitHub Action to Update YAML File

Here is a GitHub Action designed to populate the option values:

```yaml
name: 'Populate option values'

on:
  push:
    branches:
      - 'main'

jobs:
  eslint:
    name: Populate Option Values
    runs-on: ubuntu-latest
    steps:
      - name: Check out Code
        uses: actions/checkout@v2
        with:
          token: ${{ secrets.GH_TOKEN }}

      - name: Run Populator
        run: ./scripts/populate-option-value.sh

      - name: Commit Changes
        run: |
          if git diff --quiet; then
            echo "ℹ️ No new Component names to update"
          else
            git config --global user.email "${{ github.actor }}@email.com }}"
            git config --global user.name "${{ github.actor }}"
            git status
            git add .github/workflows/release-it.yml
            git commit -m "✅ Populated option values"
            git push
          fi
```

Note: You'll need to create a GitHub Personal Access Token (PAT) with push permissions, as the default GitHub PAT does not allow changes to be pushed from the GitHub Action. This should be configured as a secret in your repository.

### Populator Script

A script is used to read the current parameter values, compare them to the dynamic values, and update the YAML file if they differ:

Note: here I use `yq` to manipulate YAML. Further you need to allow GH Action to run the script otherwise you will get `Permision Denied` error when run Action.

`git update-index --chmod=+x your_script.sh`

```bash
#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
SOURCE_YAML_FILE="$SCRIPT_DIR/../.github/workflows/target-action.yml"

# dynamically generate values.
# ex. could read repository or file to get values
OPTIONS=(major minor patch prerelease)

current_options=$(yq eval '.on.workflow_dispatch.inputs.version.options' $SOURCE_YAML_FILE )

current_options_array=()
while read -r word; do
    current_options_array+=("$word")
done <<< "$current_options"

declare -a output_array=()

for i in $OPTIONS; do
    output_array+=("$i")
done

# Check if the values in the arrays are equal
if [[ "${current_options_array[*]}" == "${output_array[*]}" ]]; then
    echo "Values in YAML file are equal to values in array. No update needed."
else
    echo "Values in YAML file are not equal to values in array. Updating YAML file."
    # Construct YAML-compatible string
    options_string="["

    for option in "${output_array[@]}"; do
        options_string+="\\"$option\\", "
    done

    options_string="${options_string%, }]"

    yq eval ".on.workflow_dispatch.inputs.version.options = $options_string" $SOURCE_YAML_FILE > temp.yml && mv temp.yml $SOURCE_YAML_FILE
fi

```

The action file with the choice parameter might look like this:

```yaml
name: 'Release'
on:
  workflow_dispatch:
    inputs:
      version:
        type: choice
        options:
          - 'major'
          - 'minor'
        required: true
        default: 'patch'
jobs:
  release:
    runs-on: [ubuntu-latest]
    name: Release it
    environment: NPM_Feed
    steps:
      - name: Check out Code
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
```

When the populator action is triggered (any changes pushed to the branch), it will execute the script, populate the target action YAML, and create a commit pushing the changes. The updated YAML might look like this:

```yaml
name: 'Release'
on:
  workflow_dispatch:
    inputs:
      version:
        type: choice
        options:
          - 'major'
          - 'minor'
					- 'patch'
          - 'prerelease'
        required: true
        default: 'patch'
jobs:
  release:
    runs-on: [ubuntu-latest]
    name: Release it
    steps:
      - name: Check out Code
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
      .......

```

This strategy allows for dynamic population of choice parameters in your GitHub Actions.
