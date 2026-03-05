import express from "express"
import { getAnnouncements } from "../controllers/announcementController"

const router = express.Router()

router.get("/", getAnnouncements)

export default router