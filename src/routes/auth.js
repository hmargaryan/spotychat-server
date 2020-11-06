const router = require('express').Router()
const passport = require('passport')
const { createJWT } = require('../utils/functions')

router.get('/spotify', passport.authenticate('spotify', { session: false }))

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', { session: false }),
  (req, res) => {
    const accessToken = createJWT(req.user.id)
    return res.status(200).json({ accessToken })
  }
)

module.exports = router
