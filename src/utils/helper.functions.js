import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const createJWT = id => {
  const options = {
    expiresIn: '15d'
  }
  return jwt.sign({ id }, config.ACCESS_TOKEN_SECRET, options)
}

export const sendMessage = (res, status, message, error) => {
  if (error) console.error(error.message)
  return res.status(status).json({ message })
}
