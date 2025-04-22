# GitHub Copilot Rules

This document defines rules and standards for GitHub Copilot suggestions in this repository.

## Code Style Guidelines

1. **Code Representation**
   - Do not repeat existing code when suggesting changes
   - Use comments with `// ...existing code...` to represent unchanged regions
   - Be concise and focus only on the necessary changes

2. **File Documentation**
   - Every code block must start with a comment containing the exact filepath
   - For Markdown files, include the filepath as a comment at the top: `<!-- filepath: /path/to/file.md -->`
   - For code files, use the appropriate comment syntax for the language: `// filepath: /path/to/file.js`

3. **File Locations**
   - Match existing filepaths exactly when editing files
   - Place any new files inside the `/workspaces/iamjeevan` directory
   - Follow the existing project structure when suggesting new file locations

## Example of Proper Change Format

When suggesting changes to files, follow this format:

```javascript
// filepath: /workspaces/iamjeevan/data/siteMetadata.js
const siteMetadata = {
  // ...existing code...
  description: 'Updated description for the website',
  // ...existing code...
  email: 'jeevan@iamjeevan.com',
  // ...existing code...
}
```

This format ensures that:
1. The filepath is clearly specified
2. Only the changed parts are shown
3. Existing code is represented with comments

## Markdown Syntax Guidelines

1. **Character Escaping**
   - Escape angle brackets with HTML entities (`&lt;` and `&gt;`) or use backticks for inline code
   - For generic types in headings (e.g., `IOptions<T>`), always use HTML entities: `IOptions&lt;T&gt;`
   - Escape special Markdown characters with backslash when needed: `\*`, `\_`, `\#`

2. **Code Blocks**
   - Always use triple backticks (
```
<copilot-edited-file>
````
<copilot-edited-file>
````markdown
# GitHub Copilot Rules

This document defines rules and standards for GitHub Copilot suggestions in this repository.

## Code Style Guidelines

1. **Code Representation**
   - Do not repeat existing code when suggesting changes
   - Use comments with `// ...existing code...` to represent unchanged regions
   - Be concise and focus only on the necessary changes

2. **File Documentation**
   - Every code block must start with a comment containing the exact filepath
   - For Markdown files, include the filepath as a comment at the top: `<!-- filepath: /path/to/file.md -->`
   - For code files, use the appropriate comment syntax for the language: `// filepath: /path/to/file.js`

3. **File Locations**
   - Match existing filepaths exactly when editing files
   - Place any new files inside the `/workspaces/iamjeevan` directory
   - Follow the existing project structure when suggesting new file locations

## Example of Proper Change Format

When suggesting changes to files, follow this format:

```javascript
// filepath: /workspaces/iamjeevan/data/siteMetadata.js
const siteMetadata = {
  // ...existing code...
  description: 'Updated description for the website',
  // ...existing code...
  email: 'jeevan@iamjeevan.com',
  // ...existing code...
}
```

This format ensures that:
1. The filepath is clearly specified
2. Only the changed parts are shown
3. Existing code is represented with comments

## Markdown Syntax Guidelines

1. **Character Escaping**
   - Escape angle brackets with HTML entities (`&lt;` and `&gt;`) or use backticks for inline code
   - For generic types in headings (e.g., `IOptions<T>`), always use HTML entities: `IOptions&lt;T&gt;`
   - Escape special Markdown characters with backslash when needed: `\*`, `\_`, `\#`

2. **Code Blocks**
   - Always use triple backticks (```)