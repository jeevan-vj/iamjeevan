---
title: 'How to Connect Cursor IDE with Supabase Using Model Context Protocol (MCP)'
date: '2025-05-14'
tags: ['Cursor', 'Supabase', 'MCP', 'AI', 'Developer-Tools']
draft: false
summary: 'A step-by-step guide to configuring Cursor IDE to connect with Supabase using the Model Context Protocol for enhanced AI-powered database interactions'
---


The Model Context Protocol (MCP) allows Cursor IDE to directly connect with Supabase, giving the AI assistant context about your database schema, tables, relationships, and data. By establishing this connection, you can leverage AI-powered database interactions without leaving your IDE.

## Prerequisites

Before setting up the connection, ensure you have:

1. **Supabase Account and Project**: Sign up at [supabase.com](https://supabase.com) and create a project
2. **Cursor IDE Installed**: Download from [cursor.so](https://cursor.so)
3. **Node.js and npm**: Version 16 or higher
4. **Personal Access Token (PAT)**: Generated from your Supabase dashboard

```bash
# Verify Node.js and npm installation
node -v  # Should be v16.0.0 or higher
npm -v
```

## Creating the MCP Configuration

1. Create a `.cursor` folder in your project's root directory
2. Inside this folder, create an `mcp.json` file with the following configuration:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--access-token",
        "<your-personal-access-token>"
      ]
    }
  }
}
```

Replace `<your-personal-access-token>` with the PAT you generated from Supabase's dashboard under **Settings > Access Tokens**. Name your token something descriptive like "Cursor MCP Server".

## Verifying the Connection

Once the configuration is in place:

1. Open or restart Cursor IDE
2. Navigate to **Settings > MCP**
3. You should see the Supabase MCP server listed with a green "active" status

```bash
# If you're having connection issues, you can manually test the MCP server
npx @supabase/mcp-server-supabase@latest --access-token <your-token> --debug
```

## Practical Usage Examples

With the MCP server connected, you can interact with your database in natural language:

```
# Example prompts you can now use in Cursor IDE
"Show me the users table schema"
"Generate a query to find all orders placed in the last week"
"Create a new table to store product reviews with appropriate fields"
```

## Result

When properly configured:
- Cursor IDE will understand your database schema
- You can generate SQL queries using natural language
- Create or modify tables and schemas directly from the IDE
- Get context-aware code completions for database operations

For enhanced security, consider storing your access token as an environment variable and referencing it in your configuration instead of hardcoding it.

Happy Coding :)
