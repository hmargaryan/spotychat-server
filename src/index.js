// import { Server } from 'socket.io'
import http from 'http'
import * as mongodb from './mongodb.js'
import { config } from './config/config.js'
import { app } from './app.js'
// import Chat from './models/Chat.js'

const server = http.createServer(app)
// const io = new Server(server)

// io.on('connection', socket => {
//   console.log('User is connected')

//   socket.on('joinToChat', async ({ chatId, userIds }) => {
//     console.log('joinToChat', userIds)
//     let chat
//     chat = await Chat.findById(chatId)
//     if (!chat) {
//       chat = await Chat.create({
//         users: userIds
//       })
//     }
//     socket.join(chat.id)
//   })

//   socket.on('joinToApp', async ({ userId }) => {
//     console.log('joinToApp', userId)
//     socket.join(userId)
//   })

//   socket.on(
//     'sendMessage',
//     async ({ chatId, interlocutorId, owner, text }, callback) => {
//       console.log(chatId, interlocutorId, owner, text)
//       const chat = await Chat.findById(chatId)
//       chat.messages = [...chat.messages, { text, owner }]
//       await chat.save()
//       io.to(interlocutorId).emit('userMessage', { text, owner, chatId })
//       io.to(chatId).emit('message', { text, owner })
//       callback()
//     }
//   )

//   socket.on('disconnect', () => {
//     console.log('User is disconnected')
//   })
// })

mongodb
  .connect()
  .then(() => {
    server.listen(config.PORT, () => console.log(`Running on ${config.PORT}`))
  })
  .catch(e => console.error(e))
