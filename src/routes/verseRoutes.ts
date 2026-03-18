import express from 'express'
import { getDailyVerse } from '../controllers/verseController'

const router = express.Router()
router.get('/', getDailyVerse)

export default router