import mongoose from 'mongoose'

import config from './config/config.js'

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

export default async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, mongodbOptions)
    console.log('Connected to MongoDB')
  } catch (e) {
    throw new Error('Error while connecting to MongoDB')
  }
}
