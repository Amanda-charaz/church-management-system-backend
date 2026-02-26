import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import memberRoutes from './routes/memberRoutes'
import visitorRoutes from './routes/visitorRoutes'
import financeRoutes from './routes/financeRoutes'
import announcementRoutes from './routes/announcementRoutes'
import verseRoutes from './routes/verseRoutes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/members', memberRoutes)
app.use('/api/visitors', visitorRoutes)
app.use('/api/finances', financeRoutes)
app.use('/api/announcements', announcementRoutes)
app.use('/api/verse', verseRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Church Management API is running 🚀' })
})

export default app