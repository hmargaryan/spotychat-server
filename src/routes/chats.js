import express from 'express'
import { auth } from '../middleware/auth.middleware.js'
import { sendMessage } from '../utils/helper.functions.js'
import Chat from '../models/Chat.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const data = await Chat.find().populate('users', 'name avatar')
    const chats = data.filter(chat =>
      chat.users.some(user => user._id.toString() === req.user.id.toString())
    )
    return res.status(200).json(chats)
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

export default router
