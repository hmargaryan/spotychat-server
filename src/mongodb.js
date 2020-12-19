import mongoose from 'mongoose'
import { config } from './config/config.js'

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

export const connect = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, mongodbOptions)
  } catch (e) {
    throw new Error('Error while connecting to MongoDB')
  }
}
