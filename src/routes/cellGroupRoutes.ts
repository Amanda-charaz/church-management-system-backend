import express from 'express'
import { getCellGroups, addCellGroup, updateCellGroup, deleteCellGroup } from '../controllers/cellGroupController'
import { protect } from '../middleware/protect'

const router = express.Router()
router.get('/', protect, getCellGroups)
router.post('/', protect, addCellGroup)
router.put('/:id', protect, updateCellGroup)
router.delete('/:id', protect, deleteCellGroup)

export default router