import express from 'express'
import { getVerse } from '../controllers/verseController'

const router = express.Router()
router.get('/', getVerse)

export default router