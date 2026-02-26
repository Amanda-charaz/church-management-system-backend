import { Router } from 'express'
import { addMember, getMembers, getMember, updateMember, deleteMember } from '../controllers/memberController'
import { protect, authorize } from '../middleware/protect'

const router = Router()

router.use(protect)

router.post('/', authorize('ADMIN', 'PASTOR'), addMember)
router.get('/', getMembers)
router.get('/:id', getMember)
router.put('/:id', authorize('ADMIN', 'PASTOR'), updateMember)
router.delete('/:id', authorize('ADMIN'), deleteMember)

export default router