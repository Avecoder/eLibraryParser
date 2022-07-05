import { Router } from 'express'
import { getPublic, getAuthor } from '../controllers/publicController.js'

const router = new Router()


router.get('/get-public', getPublic)
router.get('/get-author', getAuthor)

export default router
