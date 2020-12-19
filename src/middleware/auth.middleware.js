import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { config } from '../config/config.js'
import { User } from '../models/User.js'

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return next(createError(401, 'No authorization'))
    }

    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decoded.id)
    if (!user) {
      return next(createError(401, 'No authorization'))
    }

    req.user = decoded
    return next()
  } catch (e) {
    return next(createError(401, 'No authorization'))
  }
}
