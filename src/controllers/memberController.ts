import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import { AuthRequest } from '../middleware/protect'

export const addMember = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, phone, email, department, status } = req.body
    const churchId = req.user?.churchId

    const member = await prisma.member.create({
      data: { firstName, lastName, phone, email, department, status, churchId: churchId! }
    })

    res.status(201).json({ message: 'Member added successfully', member })
  } catch (error) {
    console.error('ADD MEMBER ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getMembers = async (req: AuthRequest, res: Response) => {
  try {
    const churchId = req.user?.churchId

    const members = await prisma.member.findMany({
      where: { churchId: churchId! },
      orderBy: { createdAt: 'desc' }
    })

    res.json({ members })
  } catch (error) {
    console.error('GET MEMBERS ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getMember = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const churchId = req.user?.churchId

    const member = await prisma.member.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!member) {
      return res.status(404).json({ message: 'Member not found' })
    }

    res.json({ member })
  } catch (error) {
    console.error('GET MEMBER ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const updateMember = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { firstName, lastName, phone, email, department, status } = req.body
    const churchId = req.user?.churchId

    const member = await prisma.member.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!member) {
      return res.status(404).json({ message: 'Member not found' })
    }

    const updated = await prisma.member.update({
      where: { id },
      data: { firstName, lastName, phone, email, department, status }
    })

    res.json({ message: 'Member updated successfully', member: updated })
  } catch (error) {
    console.error('UPDATE MEMBER ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}
export const selfRegisterMember = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phone, email, address, department, baptized } = req.body
    const church = await prisma.church.findFirst({
      where: { name: { not: undefined } },
      orderBy: { name: 'asc' }
    })
    if (!church) {
      return res.status(400).json({ message: 'No church found' })
    }
    const member = await prisma.member.create({
      data: {
        firstName, lastName, phone, email, address,
        department, baptized: baptized === true || baptized === 'true',
        approved: false,
        churchId: church.id
      }
    })
    res.status(201).json({ message: 'Registration submitted successfully', member })
  } catch (error) {
    console.error('SELF REGISTER ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const approveMember = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const member = await prisma.member.update({
      where: { id },
      data: { approved: true }
    })
    res.json({ message: 'Member approved', member })
  } catch (error) {
    console.error('APPROVE MEMBER ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}
export const deleteMember = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const churchId = req.user?.churchId

    const member = await prisma.member.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!member) {
      return res.status(404).json({ message: 'Member not found' })
    }

    await prisma.member.delete({ where: { id } })

    res.json({ message: 'Member deleted successfully' })
  } catch (error) {
    console.error('DELETE MEMBER ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}