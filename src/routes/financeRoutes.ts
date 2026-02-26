import { Router } from 'express'
import { addFinance, getFinances, getFinance, updateFinance, deleteFinance } from '../controllers/financeController'
import { protect, authorize } from '../middleware/protect'

const router = Router()

// All finance routes restricted to ADMIN and FINANCE roles only
router.use(protect)
router.use(authorize('ADMIN', 'FINANCE'))

router.post('/', addFinance)
router.get('/', getFinances)
router.get('/:id', getFinance)
router.put('/:id', updateFinance)
router.delete('/:id', authorize('ADMIN'), deleteFinance)

export default router