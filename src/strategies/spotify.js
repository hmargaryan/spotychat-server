const SpotifyStrategy = require('passport-spotify').Strategy
const passport = require('passport')
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URL
} = require('../config/config')

const User = require('../models/User')

const scope = [
  'user-read-recently-played',
  'ugc-image-upload',
  'user-read-playback-position',
  'user-top-read',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-read-private',
  'playlist-modify-public',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'user-follow-read',
  'user-follow-modify',
  'user-library-modify',
  'user-library-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state'
]

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findOne(id, (err, user) => {
    if (err) return done(err)
    return done(null, user)
  })
})

passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: SPOTIFY_REDIRECT_URL,
      scope
    },
    async (accessToken, refreshToken, expiresIn, profile, done) => {
      try {
        const user = await User.findOneAndUpdate(
          { spotifyId: profile.id },
          {
            accessToken,
            refreshToken
          }
        )
        if (user) {
          return done(null, user)
        }
        const newUser = await User.create({
          accessToken,
          refreshToken,
          spotifyId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          profileUrl: profile.profileUrl,
          photo: profile.photos[0],
          followers: profile.followers,
          product: profile.product
        })
        return done(null, newUser)
      } catch (e) {
        console.log(e)
        return done(e)
      }
    }
  )
)
