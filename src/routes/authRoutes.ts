import express from 'express'
import { login, changePassword } from '../controllers/authController'
import { protect } from '../middleware/protect'

const router = express.Router()

router.post('/login', login)
router.put('/change-password', protect, changePassword)

export default router
