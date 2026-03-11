import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import { AuthRequest } from '../middleware/protect'

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    })
    res.json({ events })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const addEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, date, time, location } = req.body
    const churchId = req.user?.churchId
    const event = await prisma.event.create({
      data: { title, description, date: new Date(date), time, location, churchId: churchId! }
    })
    res.status(201).json({ message: 'Event created successfully', event })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    await prisma.event.delete({ where: { id } })
    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}