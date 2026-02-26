import { Router } from 'express'
import { addVisitor, getVisitors, getVisitor, updateVisitor, deleteVisitor } from '../controllers/visitorController'
import { protect, authorize } from '../middleware/protect'

const router = Router()

router.use(protect)

router.post('/', authorize('ADMIN', 'PASTOR'), addVisitor)
router.get('/', getVisitors)
router.get('/:id', getVisitor)
router.put('/:id', authorize('ADMIN', 'PASTOR'), updateVisitor)
router.delete('/:id', authorize('ADMIN'), deleteVisitor)

export default router