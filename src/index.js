import { Server } from 'socket.io'
import http from 'http'
import * as mongodb from './mongodb.js'
import { config } from './config/config.js'
import { app } from './app.js'
import { Chat } from './models/Chat.js'

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', socket => {
  console.log('User is connected')

  socket.on('join', async ({ chatId, users }) => {
    console.log(`User is join to ${chatId}`)
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $set: { users } },
      { upsert: true, new: true }
    )
    socket.join(chat.id)
  })

  socket.on('sendMessage', async ({ chatId, owner, text }, callback) => {
    console.log(`User send message ${text} to ${chatId}`)
    const chat = await Chat.findById(chatId)
    chat.messages = [...chat.messages, { text, owner }]
    await chat.save()
    io.to(chatId).emit('message', { text, owner })
    callback()
  })

  socket.on('disconnect', () => {
    console.log('User is disconnected')
  })
})

mongodb
  .connect()
  .then(() => {
    server.listen(config.PORT, () => console.log(`Running on ${config.PORT}`))
  })
  .catch(e => console.error(e))
