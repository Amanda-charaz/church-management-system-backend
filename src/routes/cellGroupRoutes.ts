import express from 'express'
import { getCellGroups, addCellGroup, updateCellGroup, deleteCellGroup } from '../controllers/cellGroupController'
import { protect } from '../middleware/protect'
import prisma from '../lib/prisma'

const router = express.Router()
router.get('/public', async (req, res) => {
  const cellGroups = await prisma.cellGroup.findMany({ orderBy: { createdAt: 'desc' } })
  res.json({ cellGroups })
})
router.get('/', protect, getCellGroups)
router.post('/', protect, addCellGroup)
router.put('/:id', protect, updateCellGroup)
router.delete('/:id', protect, deleteCellGroup)

export default router
