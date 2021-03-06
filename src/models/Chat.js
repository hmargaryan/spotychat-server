import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    messages: [
      {
        owner: { type: mongoose.Types.ObjectId, ref: 'User' },
        text: String
      }
    ]
  },
  {
    versionKey: false,
    timestamp: true
  }
)

export const Chat = mongoose.model('Chat', schema)
