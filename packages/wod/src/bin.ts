#!/usr/bin/env node

import { z } from 'zod'
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js'
import { zodToJsonSchema } from 'zod-to-json-schema'
import * as tools from './tools/index.js'

enum ToolNames {
  GetWod = 'get_wod',
}

const getWodInputSchema = z.object({
  date: z
    .union([z.literal('yesterday'), z.string().regex(/^\d{2}-\d{2}-\d{4}$/)])
    .optional()
    .describe('The date parameter. Defaults to today if not provided.'),
})

const GET_WOD_TOOL: Tool = {
  name: ToolNames.GetWod,
  description:
    'A daily workout routine designed to challenge and improve overall fitness.',
  inputSchema: {
    ...zodToJsonSchema(getWodInputSchema),
    type: 'object',
  },
}

// Server implementation
const server = new Server(
  {
    name: 'crossfit-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [GET_WOD_TOOL],
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params

    if (!args) {
      throw new Error('No arguments provided')
    }

    switch (name as ToolNames) {
      case ToolNames.GetWod: {
        const result = getWodInputSchema.safeParse(args)

        if (!result.success)
          throw new Error(`Invalid arguments: ${result.error.message}`)

        const markdown = await tools.get_wod(result.data.date)

        return {
          content: [
            {
              type: 'text',
              mimeType: 'markdown',
              text: markdown,
            },
          ],
          isError: false,
        }
      }

      default: {
        return {
          content: [{ type: 'text', text: `Unknown tool: ${name}` }],
          isError: true,
        }
      }
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${
            error instanceof Error ? error.message : JSON.stringify(error)
          }`,
        },
      ],
      isError: true,
    }
  }
})

async function runServer() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('CrossFit MCP Server running on stdio')
}

runServer().catch((error) => {
  console.error('Fatal error running server:', error)
  process.exit(1)
})
