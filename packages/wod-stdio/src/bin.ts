#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { parseDate, CrossfitApi } from '../../shared/src/index.js'

function createWodTool() {
  const name = 'wod'
  const description =
    'A daily workout routine designed to challenge and improve overall fitness.'

  const metadata = {
    title: 'Workout of the Day',
    description,
  }

  function register(server: McpServer) {
    server.tool(name, description, async () => {
      const date = parseDate('') // today

      try {
        const { data } = await CrossfitApi.getWod(date)
        const { title, wodRaw } = data.wods
        const textContent = `# ${title}\n\n${wodRaw}`

        return {
          content: [
            {
              type: 'text',
              mimeType: 'text/markdown',
              text: textContent,
            },
          ],
        }
      } catch (exception: any) {
        const notFound = `# Sorry, I couldn't fetch the WOD. Please visit [CrossFit.com](${CrossfitApi.getWodURL(
          date
        )}) to view today's workout.`

        return {
          isError: true,
          content: [
            {
              type: 'text',
              mimeType: 'text/markdown',
              text:
                exception.response.status === 404
                  ? notFound
                  : exception?.message,
            },
          ],
        }
      }
    })
  }

  return {
    name,
    description,
    metadata,
    register,
  }
}

function createServer() {
  const wodTool = createWodTool()

  const server = new McpServer(
    {
      name: 'mcp-stdio',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {
          [wodTool.name]: wodTool.metadata,
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

async function createTransport(server: McpServer) {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

const server = createServer()

;(async () => {
  try {
    await createTransport(server)
  } catch (error) {
    console.error('Failed to initialize MCP server:', error)
    process.exit(1)
  }
})()
