import express from 'express'
import createError from 'http-errors'
import { auth } from '../middleware/auth.middleware.js'
import { User } from '../models/User.js'
import { spotify } from '../spotify.js'

const router = express.Router()

router.get('/profile', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    spotify.setAccessToken(user.accessToken)

    const tracksData = await spotify.getMySavedTracks()
    const tracks = tracksData.body.items.map(item => {
      const { artists, name } = item.track
      return `${artists.map(a => a.name).join(', ')} - ${name}`
    })

    const playlistsData = await spotify.getMySavedAlbums()
    const playlists = playlistsData.body.items.map(item => {
      const { images } = item.album
      return images[0]
    })

    return res.status(200).json({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      tracks,
      playlists
    })
  } catch (e) {
    return next(createError(500, e))
  }
})

export const usersRoutes = router
