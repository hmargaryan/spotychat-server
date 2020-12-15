import express from 'express'
import { createJWT, sendMessage } from '../utils/helper.functions.js'
import { spotify } from '../spotify.js'
import { isCodeValid } from '../validators/auth.validator.js'
import { validate } from '../middleware/validate.middleware.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/', isCodeValid, validate, async (req, res) => {
  try {
    const { code } = req.query
    const data = await spotify.authorizationCodeGrant(code)
    spotify.setAccessToken(data.body['access_token'])
    const { body } = await spotify.getMe()
    const user = await User.findOneAndUpdate(
      { spotifyId: body.id },
      {
        $set: {
          accessToken: data.body['access_token'],
          refreshToken: data.body['refresh_token'],
          spotifyId: body.id,
          email: body.email,
          name: body['display_name'],
          uri: body.uri,
          url: body['external_urls']['spotify'],
          avatar: body.images[0]?.url,
          product: body.product
        }
      },
      { upsert: true, new: true }
    )
    const accessToken = createJWT(user.id)
    return res.status(200).json({ accessToken })
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

export default router
