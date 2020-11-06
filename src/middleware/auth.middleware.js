const SpotifyWebApi = require('spotify-web-api-node')
const jwt = require('jsonwebtoken')

const {
  ACCESS_TOKEN_SECRET,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET
} = require('../config/config')
const User = require('../models/User')

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET
})

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    spotifyApi.setAccessToken(user.accessToken)
    spotifyApi.setRefreshToken(user.refreshToken)
    const data = await spotifyApi.refreshAccessToken()
    user.accessToken = data.body.access_token
    await user.save()

    req.user = user
    return next()
  } catch (e) {
    console.log(e)
    return res.status(401).json({ message: 'Нет авторизации' })
  }
}
