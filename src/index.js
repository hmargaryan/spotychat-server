const app = require('./server')
const mongodb = require('./mongodb')

const start = async () => {
  try {
    await mongodb.connect()
    app.listen()
  } catch (e) {
    console.log(e)
  }
}

start()
