import express from "express"
import { getAnnouncements, createAnnouncement } from "../controllers/announcementController"
import { authenticate, authorize } from "../middleware/auth"

const router = express.Router()

// PUBLIC
router.get("/", getAnnouncements)

// ADMIN ONLY
router.post("/", authenticate, authorize("ADMIN", "PASTOR"), createAnnouncement)

export default router