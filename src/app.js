import compression from 'compression'
import { fileURLToPath } from 'url'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'

// import usersRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
// import chatsRoutes from './routes/chats.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use('/auth', authRoutes)
// app.use('/users', usersRoutes)
// app.use('/chats', chatsRoutes)

export { app }
