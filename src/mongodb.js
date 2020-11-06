const mongoose = require('mongoose')

const { MONGODB_URI } = require('./config/config')

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

module.exports.connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, mongodbOptions)
    console.log('Connected to MongoDB')
  } catch (e) {
    console.log(e)
  }
}
