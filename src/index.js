import { Server } from 'socket.io'
import http from 'http'
import * as mongodb from './mongodb.js'
import { config } from './config/config.js'
import { app } from './app.js'

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', socket => {
  console.log('User is connected')

  socket.on('join', () => {
    console.log(`User is join to 1`)
    socket.join('1')
  })

  socket.on('msgToServer', async (message, callback) => {
    console.log(`User send message ${message.text} to ${message.name}`)
    io.to('1').emit('msgToClient', message)
    callback()
  })

  socket.on('disconnect', () => {
    console.log('User is disconnected')
  })
})

mongodb
  .connect()
  .then(() => {
    server.listen(process.env.PORT || config.PORT, () =>
      console.log(`Running on ${config.PORT}`)
    )
  })
  .catch(e => console.error(e))
