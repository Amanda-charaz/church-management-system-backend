import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import { AuthRequest } from '../middleware/protect'

export const getCellGroups = async (req: AuthRequest, res: Response) => {
  try {
    const churchId = req.user?.churchId
    const cellGroups = await prisma.cellGroup.findMany({
      where: { churchId: churchId! },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ cellGroups })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const addCellGroup = async (req: AuthRequest, res: Response) => {
  try {
    const { name, leader, location, meetingDay, meetingTime } = req.body
    const churchId = req.user?.churchId
    const cellGroup = await prisma.cellGroup.create({
      data: { name, leader, location, meetingDay, meetingTime, churchId: churchId! }
    })
    res.status(201).json({ message: 'Cell group created', cellGroup })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const updateCellGroup = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { name, leader, location, meetingDay, meetingTime } = req.body
    const cellGroup = await prisma.cellGroup.update({
      where: { id },
      data: { name, leader, location, meetingDay, meetingTime }
    })
    res.json({ message: 'Cell group updated', cellGroup })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const deleteCellGroup = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    await prisma.cellGroup.delete({ where: { id } })
    res.json({ message: 'Cell group deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}