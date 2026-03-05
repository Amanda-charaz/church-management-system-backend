import express from "express"
import cors from "cors"

import memberRoutes from "./routes/memberRoutes"
import visitorRoutes from "./routes/visitorRoutes"
import financeRoutes from "./routes/financeRoutes"
import announcementRoutes from "./routes/announcementRoutes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/members", memberRoutes)
app.use("/visitors", visitorRoutes)
app.use("/finances", financeRoutes)
app.use("/announcements", announcementRoutes)

export default app