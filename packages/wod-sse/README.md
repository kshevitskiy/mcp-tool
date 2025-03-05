# 🏋️ WOD Tool (SSE server) — Your Daily CrossFit Companion

Stay on top of your training with WOD Tool — a simple **Model-Context-Protocol** utility that fetches the Workout of the Day straight from the official CrossFit website.

**Features:**

- 🔥 Automatically fetches the latest WOD
- 📅 Pass a date parameter to access past workouts
- ⏳ Lightweight, distraction-free output
- 🔌 Real-time data streaming via Server-Sent Events (SSE)

**@slvrio/wod-sse** leverages the **Model-Context-Protocol (MCP)** framework to enable seamless, unidirectional data flow — perfect for environments where continuous updates matter.

## Setup

### Cursor IDE integration

To integrate **WOD Tool** with **Cursor IDE**, follow these steps:

1. Start the **SSE** server:

   ```sh
   # in the wod-sse directory
   pnpm serve
   ```

2. Open **Cursor IDE** settings
3. Navigate to `MCP` tab
4. Click on `Add new MCP server`
5. Fill in the fields:

   - **Name:** Any name
   - **Type:** `sse`
   - **Server URL:** `http://localhost:3001/sse`

6. Click **Save**

## Usage

In **Cursor IDE Chat** (use `cmd+i`), type:

```text
wod
```

Then run the **WOD Tool** with `cmd+enter`

### Fetching Past WODs

To request WODs for past dates, pass the `date` parameter:

**Examples:**

> give me the wod from yesterday

**or**

> what was the wod on 01-01-2025
