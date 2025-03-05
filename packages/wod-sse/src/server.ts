import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import * as wodTool from './wod.tool'

// create the mcp server and register tools
export function createServer() {
  const server = new McpServer(
    {
      name: 'mcp-sse',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {
          [wodTool.NAME]: wodTool.metadata,
        },
      },
    }
  )

  try {
    wodTool.register(server)
  } catch (exception) {
    console.error(exception)
  }

  return server
}
