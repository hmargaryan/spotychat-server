import express from 'express'
import createError from 'http-errors'
import { auth } from '../middleware/auth.middleware.js'
import { Chat } from '../models/Chat.js'

const router = express.Router()

router.get('/', auth, async (req, res, next) => {
  try {
    const data = await Chat.find().populate('users')
    const chats = data.filter(chat =>
      chat.users.some(user => user._id.toString() === req.user.id.toString())
    )
    return res.status(200).json(chats)
  } catch (e) {
    console.log(e)
    return next(createError(500, e))
  }
})

export const chatsRoutes = router
