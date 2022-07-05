import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

import router from './router/index.js'

const app = express()


app.use(cors())
app.use(express.json())
app.use('/', router)


const PORT = process.env.PORT || 5000


const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started`))
  } catch(err) {
    console.log(err)
  }
}

start()
