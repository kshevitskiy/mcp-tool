#!/usr/bin/env node

import _yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import StoryblokClient from 'storyblok-js-client'
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js'
import * as guards from './guards.js'
import * as service from './service/index.js'

enum Tools {
  PostSpace = 'spaces_create',
  GetComponent = 'component_get',
  GetComponentsTypes = 'typedefs_get',
  GetComponents = 'components_get',
  GetSpaces = 'spaces_get',
}

// Parse arguments
const argv = _yargs(hideBin(process.argv))
  .option('token', {
    type: 'string',
  })
  .option('space_id', {
    type: 'string',
  })
  .parseSync()

// Check for Personal API Token
const STORYBLOK_PERSONAL_API_TOKEN =
  process.env.STORYBLOK_PERSONAL_API_TOKEN! || argv.token
if (!STORYBLOK_PERSONAL_API_TOKEN) {
  console.error(
    'Error: STORYBLOK_PERSONAL_API_TOKEN environment variable is required'
  )

  process.exit(1)
}

const STORYBLOK_SPACE_ID = process.env.STORYBLOK_SPACE_ID! || argv.space_id
const hasSpaceId = STORYBLOK_SPACE_ID && typeof STORYBLOK_SPACE_ID === 'string'

// Define tools
const CREATE_SPACE_TOOL: Tool = {
  name: Tools.PostSpace,
  description: 'Create a new space.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name of the Space',
      },
    },
    required: ['name'],
  },
}

const LIST_SPACES_TOOL: Tool = {
  name: Tools.GetSpaces,
  description: 'Returns an array of space objects.',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
}

const LIST_COMPONENTS_TOOL: Tool = {
  name: Tools.GetComponents,
  description: 'Returns an array of component objects.',
  inputSchema: {
    type: 'object',
    properties: {
      ...(!hasSpaceId && {
        space_id: {
          type: 'string',
          description: 'Numeric ID of a space',
        },
      }),
    },
    required: !hasSpaceId ? ['space_id'] : [],
  },
}

const GET_COMPONENT_TOOL: Tool = {
  name: Tools.GetComponent,
  description:
    'Returns a single, fully loaded component object by providing a specific numeric id.',
  inputSchema: {
    type: 'object',
    properties: {
      ...(!hasSpaceId && {
        space_id: {
          type: 'string',
          description: 'Numeric ID of a space',
        },
      }),
      component_id: {
        type: 'string',
        description: 'Numeric id of a component',
      },
    },
    required: [...(!hasSpaceId ? ['space_id'] : []), 'component_id'],
  },
}

const GENERATE_TYPEDEFS_TOOL: Tool = {
  name: Tools.GetComponentsTypes,
  description:
    'Generate Typescript type definitions for your Storyblok components',
  inputSchema: {
    type: 'object',
    properties: {
      ...(!hasSpaceId && {
        space_id: {
          type: 'string',
          description: 'Numeric ID of a space',
        },
      }),
    },
    required: !hasSpaceId ? ['space_id'] : [],
  },
}

// Server implementation
const server = new Server(
  {
    name: 'todoist-mcp-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// Initialize Storyblok client
// @ts-ignore
const storyblok = new StoryblokClient({
  oauthToken: STORYBLOK_PERSONAL_API_TOKEN,
})

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    CREATE_SPACE_TOOL,
    LIST_SPACES_TOOL,
    LIST_COMPONENTS_TOOL,
    GET_COMPONENT_TOOL,
    GENERATE_TYPEDEFS_TOOL,
  ],
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params

    if (!args) {
      throw new Error('No arguments provided')
    }

    switch (name as Tools) {
      case Tools.PostSpace: {
        if (!guards.createSpaceArgs(args)) {
          throw new Error(`Invalid arguments for ${Tools.PostSpace}`)
        }

        const markdown = await service.create_space(storyblok, args.name)

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

      case Tools.GetSpaces: {
        const markdown = await service.list_spaces(storyblok)

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

      case Tools.GetComponents: {
        args.space_id ??= STORYBLOK_SPACE_ID

        if (!guards.spaceIdArgs(args)) {
          throw new Error(`Invalid arguments for ${Tools.GetComponents}`)
        }

        const markdown = await service.list_components(storyblok, args.space_id)

        return {
          content: [
            {
              type: 'text',
              mimeType: 'markdown',
              text: markdown,
              // text: JSON.stringify(response, null, 2),
            },
          ],
          isError: false,
        }
      }

      case Tools.GetComponent: {
        args.space_id ??= STORYBLOK_SPACE_ID

        if (!guards.isGetComponentTaskArgs(args)) {
          throw new Error(`Invalid arguments for ${Tools.GetComponent}`)
        }

        const markdown = await service.get_component(
          storyblok,
          args.space_id,
          args.component_id
        )

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

      case Tools.GetComponentsTypes: {
        args.space_id ??= STORYBLOK_SPACE_ID

        if (!guards.spaceIdArgs(args)) {
          throw new Error(`Invalid arguments for ${Tools.GetComponentsTypes}`)
        }

        const markdown = await service.typedefs(storyblok, args.space_id)

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
  console.error('Storyblok MCP Server running on stdio')
}

runServer().catch((error) => {
  console.error('Fatal error running server:', error)
  process.exit(1)
})
