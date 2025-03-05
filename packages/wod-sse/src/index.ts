import * as http from 'node:http'
import { createApp, createRouter, defineEventHandler, toNodeListener } from 'h3'
import { createServer } from './server'
import { createTransport } from './transport'

export const app = createApp()
const router = createRouter()
const transport = createTransport(createServer())

router.get(
  '/',
  defineEventHandler(() => ({ status: '✅' }))
)
router.get('/sse', transport.sseEventHandler)
router.post('/messages', transport.messagesEventHandler)

app.use(router)

http.createServer(toNodeListener(app))
