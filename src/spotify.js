import SpotifyWebApi from 'spotify-web-api-node'
import config from './config/config.js'

const credentials = {
  redirectUri: config.SPOTIFY_REDIRECT_URI,
  clientId: config.SPOTIFY_CLIENT_ID,
  clientSecret: config.SPOTIFY_CLIENT_SECRET
}

export const spotify = new SpotifyWebApi(credentials)

export const createAuthorizeURL = () => {
  return spotify.createAuthorizeURL(config.SCOPE)
}
