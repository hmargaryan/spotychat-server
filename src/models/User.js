const { Schema, model } = require('mongoose')

const schema = new Schema(
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
    profileUrl: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    followers: {
      type: Number,
      required: true
    },
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

module.exports = model('User', schema)
