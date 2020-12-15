import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    accessToken: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    },
    spotifyId: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    uri: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    avatar: String,
    product: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamp: true
  }
)

export default mongoose.model('User', schema)
