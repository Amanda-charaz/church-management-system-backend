import express from "express"
import { getEvents, addEvent, deleteEvent } from "../controllers/eventController"
import { protect } from "../middleware/protect"

const router = express.Router()
router.get("/", getEvents)
router.post("/", protect, addEvent)
router.delete("/:id", protect, deleteEvent)

export default router