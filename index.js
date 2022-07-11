import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import router from './router/index.js'
import { databaseUpdateTimer } from './services/databaseUpdateTimer.js'
import errorMiddleware from './middlewares/errorMiddleware.js'

const app = express()



app.use(cors())
app.use(express.json())
app.use('/', router)
app.use(errorMiddleware)


const PORT = process.env.PORT || 5000


const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://eLibararyUser:${process.env.DB_PASS}@cluster0.ws9usyx.mongodb.net/eLibraryPublications?retryWrites=true&w=majority`, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    await app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
  } catch(err) {
    console.log(err)
  }
}

start()
databaseUpdateTimer('0 12 * * mon')
