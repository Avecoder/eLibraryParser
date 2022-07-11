import cron from 'node-cron'

import { uploadPosts } from '../controllers/publicController.js'

export const databaseUpdateTimer = data => {
  cron.schedule(data, () => {
    uploadPosts()
  })
}
