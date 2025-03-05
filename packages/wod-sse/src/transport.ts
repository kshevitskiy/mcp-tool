import { defineEventHandler } from 'h3'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'
import { JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js'

export const createTransport = (server: McpServer) => {
  let transport: SSEServerTransport

  const sseEventHandler = defineEventHandler(async (event) => {
    const { res } = event.node

    transport = new SSEServerTransport('/messages', res)
    await server.connect(transport)

    const _onMsg = transport.onmessage
    const _onClose = transport.onclose
    const _onErr = transport.onerror

    transport.onmessage = (msg: JSONRPCMessage) => {
      if (_onMsg) _onMsg(msg)
    }

    transport.onclose = () => {
      if (_onClose) _onClose()
    }

    transport.onerror = (err) => {
      if (_onErr) _onErr(err)
    }

    res.on('close', async () => {
      await server.close()
      res.end()
    })

    ///
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()
  })

  const messagesEventHandler = defineEventHandler(async (event) => {
    const { req, res } = event.node

    if (transport?.handlePostMessage)
      await transport.handlePostMessage(req, res)
  })

  return {
    sseEventHandler,
    messagesEventHandler,
  }
}
