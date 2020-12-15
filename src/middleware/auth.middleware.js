import jwt from 'jsonwebtoken'
import { sendMessage } from '../utils/helper.functions.js'
import config from '../config/config.js'
import User from '../models/User.js'
import { spotify } from '../spotify.js'

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return sendMessage(res, 401, 'No authorization')
    }
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return sendMessage(res, 401, 'No authorization')
    }
    spotify.setRefreshToken(user.refreshToken)
    const { body } = await spotify.refreshAccessToken()
    user.accessToken = body['access_token']
    await user.save()
    req.user = decoded
    return next()
  } catch (e) {
    return sendMessage(res, 401, 'No authorization', e)
  }
}
