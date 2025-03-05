import { z } from 'zod'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { parseDate, CrossfitApi } from '@slvrio/shared'

export const NAME = 'wod'
export const DESCRIPTION =
  'A daily workout routine designed to challenge and improve overall fitness.'

export const metadata = {
  title: 'Workout of the Day',
  description: DESCRIPTION,
  parameters: {
    date: 'The date for which to fetch the workout. Defaults to today if not provided. Use "yesterday" to get the previous day\'s workout.',
  },
}

const schema = {
  date: z
    .union([z.literal('yesterday'), z.string().regex(/^\d{2}-\d{2}-\d{4}$/)])
    .optional(),
}

export function register(server: McpServer) {
  server.tool(NAME, DESCRIPTION, schema, async ({ date }) => {
    const { data } = await CrossfitApi.getWod(parseDate(date ?? ''))
    const { title, wodRaw } = data.wods

    const textContent = `
# ${title}

${wodRaw}
    `

    return {
      content: [
        {
          type: 'text',
          mimeType: 'text/markdown',
          text: textContent,
        },
      ],
    }
  })
}
