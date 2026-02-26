import { Router } from 'express'
import { addAnnouncement, getAnnouncements, getAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcementController'
import { protect, authorize } from '../middleware/protect'

const router = Router()

router.use(protect)

// Only ADMIN and PASTOR can create, update, delete
router.post('/', authorize('ADMIN', 'PASTOR'), addAnnouncement)
router.get('/', getAnnouncements)
router.get('/:id', getAnnouncement)
router.put('/:id', authorize('ADMIN', 'PASTOR'), updateAnnouncement)
router.delete('/:id', authorize('ADMIN'), deleteAnnouncement)

export default router