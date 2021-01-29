import createError from 'http-errors'
import express from 'express'
import jwt from 'jsonwebtoken'
import { spotify } from '../spotify.js'
import { User } from '../models/User.js'
import { config } from '../config/config.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const { code } = req.query
    if (!code) {
      return next(createError(400, 'Invalid code'))
    }

    const authorizationData = await spotify.authorizationCodeGrant(code)
    const { access_token, refresh_token } = authorizationData.body

    spotify.setAccessToken(access_token)

    const profileData = await spotify.getMe()
    const {
      id,
      email,
      display_name,
      uri,
      external_urls,
      images,
      product
    } = profileData.body

    const user = await User.findOneAndUpdate(
      { spotifyId: id },
      {
        $set: {
          accessToken: access_token,
          refreshToken: refresh_token,
          spotifyId: id,
          email,
          name: display_name,
          uri,
          url: external_urls.spotify,
          avatar: undefined,
          product
        }
      },
      { upsert: true, new: true }
    )

    const accessToken = jwt.sign({ id: user.id }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: '7d'
    })
    return res.status(200).json({ accessToken })
  } catch (e) {
    return next(createError(500, e))
  }
})

export const authRoutes = router
