import { Router } from 'express'
import { getPublic } from '../controllers/publicController.js'

const router = new Router()


router.get('/get-public', getPublic)

export default router
