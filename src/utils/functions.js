const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../config/config')

module.exports.createJWT = userId => {
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, options)
}
