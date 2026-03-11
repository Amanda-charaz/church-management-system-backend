import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import { AuthRequest } from '../middleware/protect'

export const getPrayerRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.prayerRequest.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json({ requests })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const addPrayerRequest = async (req: Request, res: Response) => {
  try {
    const { name, request } = req.body
    const church = await prisma.church.findFirst({
      where: { name: { not: undefined } },
      orderBy: { name: 'asc' }
    })
    const prayerRequest = await prisma.prayerRequest.create({
      data: { name, request, churchId: church!.id }
    })
    res.status(201).json({ message: 'Prayer request submitted', prayerRequest })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const updatePrayerStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const updated = await prisma.prayerRequest.update({
      where: { id },
      data: { status }
    })
    res.json({ message: 'Status updated', updated })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const deletePrayerRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    await prisma.prayerRequest.delete({ where: { id } })
    res.json({ message: 'Prayer request deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}