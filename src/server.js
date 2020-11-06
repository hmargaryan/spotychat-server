require('./strategies/spotify')

const compression = require('compression')
const passport = require('passport')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const { PORT } = require('./config/config')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(morgan('dev'))
app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(cors())

app.use('/v1/auth', require('./routes/auth'))

module.exports.listen = () => {
  app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))
}
