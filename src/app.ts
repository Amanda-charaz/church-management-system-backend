import express from "express"
import cors from "cors"
import memberRoutes from "./routes/memberRoutes"
import visitorRoutes from "./routes/visitorRoutes"
import financeRoutes from "./routes/financeRoutes"
import announcementRoutes from "./routes/announcementRoutes"
import authRoutes from "./routes/authRoutes"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/members", memberRoutes)
app.use("/api/visitors", visitorRoutes)
app.use("/api/finances", financeRoutes)
app.use("/api/announcements", announcementRoutes)
app.use("/api/auth", authRoutes)

export default app