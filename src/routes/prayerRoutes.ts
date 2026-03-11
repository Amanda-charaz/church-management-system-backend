import express from "express"
import { getPrayerRequests, addPrayerRequest, updatePrayerStatus, deletePrayerRequest } from "../controllers/prayerController"
import { protect } from "../middleware/protect"

const router = express.Router()
router.get("/", protect, getPrayerRequests)
router.post("/", addPrayerRequest)
router.put("/:id", protect, updatePrayerStatus)
router.delete("/:id", protect, deletePrayerRequest)

export default router