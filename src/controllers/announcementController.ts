import { Response } from 'express'
import prisma from '../lib/prisma'
import { AuthRequest } from '../middleware/protect'

export const addAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body
    const churchId = req.user?.churchId

    const announcement = await prisma.announcement.create({
      data: { title, content, churchId: churchId! }
    })

    res.status(201).json({ message: 'Announcement created successfully', announcement })
  } catch (error) {
    console.error('ADD ANNOUNCEMENT ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getAnnouncements = async (req: AuthRequest, res: Response) => {
  try {
    const churchId = req.user?.churchId

    const announcements = await prisma.announcement.findMany({
      where: { churchId: churchId! },
      orderBy: { createdAt: 'desc' }
    })

    res.json({ announcements })
  } catch (error) {
    console.error('GET ANNOUNCEMENTS ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const churchId = req.user?.churchId

    const announcement = await prisma.announcement.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' })
    }

    res.json({ announcement })
  } catch (error) {
    console.error('GET ANNOUNCEMENT ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const updateAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { title, content } = req.body
    const churchId = req.user?.churchId

    const announcement = await prisma.announcement.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' })
    }

    const updated = await prisma.announcement.update({
      where: { id },
      data: { title, content }
    })

    res.json({ message: 'Announcement updated successfully', announcement: updated })
  } catch (error) {
    console.error('UPDATE ANNOUNCEMENT ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const deleteAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const churchId = req.user?.churchId

    const announcement = await prisma.announcement.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' })
    }

    await prisma.announcement.delete({ where: { id } })

    res.json({ message: 'Announcement deleted successfully' })
  } catch (error) {
    console.error('DELETE ANNOUNCEMENT ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}