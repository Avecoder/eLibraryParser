import { Router } from 'express'
import {
  getAuthorByName,
  addAuthor,
  removeAuthor,
  getAuthorInfoFromElibrary,
  getAllUsers
} from '../controllers/authorController.js'


import {
  getAllPublications
} from '../controllers/publicController.js'


const router = new Router()

router.post('/author', addAuthor)
router.get('/author', getAuthorByName)
router.get('/author-info', getAuthorInfoFromElibrary)
router.get('/author-all', getAllUsers)
router.delete('/author/:id', removeAuthor)

router.get('/public', getAllPublications)



export default router
