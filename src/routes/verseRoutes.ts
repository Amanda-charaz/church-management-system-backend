import { Router } from 'express'
import { getDailyVerse } from '../controllers/verseController'
import { protect } from '../middleware/protect'

const router = Router()

// Any logged in user can see the daily verse
router.get('/', protect, getDailyVerse)

export default router