import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import { AuthRequest } from '../middleware/protect'

export const addVisitor = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, phone, email, notes } = req.body
    let churchId = req.user?.churchId
    if (!churchId) {
      const church = await prisma.church.findFirst({
        where: { name: { not: undefined } },
        orderBy: { name: 'asc' }
      })
      churchId = church?.id
    }
    if (!churchId) {
      return res.status(400).json({ message: 'No church found' })
    }
    const visitor = await prisma.visitor.create({
      data: { firstName, lastName, phone, email, notes, churchId }
    })
    res.status(201).json({ message: 'Visitor added successfully', visitor })
  } catch (error) {
    console.error('ADD VISITOR ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getVisitors = async (req: AuthRequest, res: Response) => {
  try {
    const churchId = req.user?.churchId

    const visitors = await prisma.visitor.findMany({
      where: { churchId: churchId! },
      orderBy: { visitDate: 'desc' }
    })

    res.json({ visitors })
  } catch (error) {
    console.error('GET VISITORS ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getVisitor = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const churchId = req.user?.churchId

    const visitor = await prisma.visitor.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' })
    }

    res.json({ visitor })
  } catch (error) {
    console.error('GET VISITOR ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const updateVisitor = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { firstName, lastName, phone, email, followUp, notes } = req.body
    const churchId = req.user?.churchId

    const visitor = await prisma.visitor.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' })
    }

    const updated = await prisma.visitor.update({
      where: { id },
      data: { firstName, lastName, phone, email, followUp, notes }
    })

    res.json({ message: 'Visitor updated successfully', visitor: updated })
  } catch (error) {
    console.error('UPDATE VISITOR ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const deleteVisitor = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const churchId = req.user?.churchId

    const visitor = await prisma.visitor.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' })
    }

    await prisma.visitor.delete({ where: { id } })

    res.json({ message: 'Visitor deleted successfully' })
  } catch (error) {
    console.error('DELETE VISITOR ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}