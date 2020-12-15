import express from 'express'
import { auth } from '../middleware/auth.middleware.js'
import { sendMessage } from '../utils/helper.functions.js'
import User from '../models/User.js'
import { spotify } from '../spotify.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    spotify.setAccessToken(user.accessToken)
    const dataTracks = await spotify.getMySavedTracks()
    const dataPlaylists = await spotify.getMySavedAlbums()
    const songs = dataTracks.body.items.map(item => {
      const { artists, name } = item.track
      return `${artists.map(a => a.name).join(', ')} - ${name}`
    })
    const playlists = dataPlaylists.body.items.map(item => {
      const { images } = item.album
      return images[0]
    })
    return res.status(200).json({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      songs,
      playlists
    })
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

export default router
