import { Response } from 'express'
import prisma from '../lib/prisma'
import { AuthRequest } from '../middleware/protect'

export const addFinance = async (req: AuthRequest, res: Response) => {
  try {
    const { title, amount, type, description } = req.body
    const churchId = req.user?.churchId

    const finance = await prisma.finance.create({
      data: { title, amount, type, description, churchId: churchId! }
    })

    res.status(201).json({ message: 'Finance record added successfully', finance })
  } catch (error) {
    console.error('ADD FINANCE ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getFinances = async (req: AuthRequest, res: Response) => {
  try {
    const churchId = req.user?.churchId

    const finances = await prisma.finance.findMany({
      where: { churchId: churchId! },
      orderBy: { createdAt: 'desc' }
    })

    // Calculate totals
    const totalIncome = finances
      .filter(f => f.type === 'INCOME')
      .reduce((sum, f) => sum + f.amount, 0)

    const totalExpense = finances
      .filter(f => f.type === 'EXPENSE')
      .reduce((sum, f) => sum + f.amount, 0)

    const balance = totalIncome - totalExpense

    res.json({ finances, summary: { totalIncome, totalExpense, balance } })
  } catch (error) {
    console.error('GET FINANCES ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getFinance = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const churchId = req.user?.churchId

    const finance = await prisma.finance.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!finance) {
      return res.status(404).json({ message: 'Finance record not found' })
    }

    res.json({ finance })
  } catch (error) {
    console.error('GET FINANCE ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const updateFinance = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { title, amount, type, description } = req.body
    const churchId = req.user?.churchId

    const finance = await prisma.finance.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!finance) {
      return res.status(404).json({ message: 'Finance record not found' })
    }

    const updated = await prisma.finance.update({
      where: { id },
      data: { title, amount, type, description }
    })

    res.json({ message: 'Finance record updated successfully', finance: updated })
  } catch (error) {
    console.error('UPDATE FINANCE ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const deleteFinance = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const churchId = req.user?.churchId

    const finance = await prisma.finance.findFirst({
      where: { id, churchId: churchId! }
    })

    if (!finance) {
      return res.status(404).json({ message: 'Finance record not found' })
    }

    await prisma.finance.delete({ where: { id } })

    res.json({ message: 'Finance record deleted successfully' })
  } catch (error) {
    console.error('DELETE FINANCE ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}