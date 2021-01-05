import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    accessToken: String,
    refreshToken: String,
    spotifyId: String,
    email: String,
    name: String,
    uri: String,
    url: String,
    avatar: String,
    product: String
  },
  {
    versionKey: false,
    timestamp: true
  }
)

export const User = mongoose.model('User', schema)
