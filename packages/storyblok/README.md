# 📖 Storyblok MCP Client

The **Storyblok MCP Client** is a command-line tool that allows you to interact seamlessly with Storyblok's API using the **Model-Context-Protocol (MCP)** framework.

## Features

- 🏗️ Create and manage Storyblok spaces
- 🔍 Retrieve components and type definitions

## Setup

### Cursor IDE Integration

1. Open **Cursor IDE** settings
2. Navigate to the `MCP` tab
3. Click on `Add new MCP server`
4. Fill in the fields:

   - **Name:** Any name
   - **Type:** `command`
   - **Command:** `npx -y @slvrio/storyblok-mcp-client`

5. Click **Save**

## Usage

> In chat (`cmd+i`), type the tool name (e.g., `list_spaces`, `get_component`) and execute it with (`cmd+enter`).

## Available Tools

- **`spaces_create`** — Create a new Storyblok space.
- **`spaces_get`** — Retrieve a list of Storyblok spaces.
- **`components_get`** — Fetch all components within a space.
- **`component_get`** — Retrieve a specific component by ID.
- **`typedefs_get`** — Generate TypeScript type definitions for components.

## Environment Variables

Ensure you have the following environment variables set up before using the tool:

- `STORYBLOK_PERSONAL_API_TOKEN` – Your Storyblok Personal API Token
- `STORYBLOK_SPACE_ID` (optional) – The space ID (if not provided via command arguments)

> **Note.** You can also pass `token` and `space_id` as script arguments, see example below.

## Example

```sh
npx -y @slvrio/storyblok-mcp-client --token YOUR_PERSONAL_API_TOKEN --space_id YOUR_SPACE_ID
```

This command initializes the MCP client with the provided API token and space ID, allowing you to execute Storyblok-related operations effortlessly.
