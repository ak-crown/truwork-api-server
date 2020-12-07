import mongoose from 'mongoose'
import { app } from './app'

import env from './env'
const { MONGO_URL, PORT } = env

const start = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  } catch (err) {
    console.error(err)
  }

  app.listen(PORT, () => {
    console.log(`App server listening on port ${PORT}`)
  })
}

start()
