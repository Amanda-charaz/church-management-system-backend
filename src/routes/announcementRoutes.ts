import express from "express"
import { getAnnouncements, addAnnouncement, deleteAnnouncement } from "../controllers/announcementController"
import { protect } from "../middleware/protect"

const router = express.Router()
router.get("/", getAnnouncements)
router.post("/", protect, addAnnouncement)
router.delete("/:id", protect, deleteAnnouncement)

export default router