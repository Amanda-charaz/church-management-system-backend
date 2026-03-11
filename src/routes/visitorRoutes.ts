import express from "express"
import { getVisitors, addVisitor } from "../controllers/visitorController"
import { protect } from "../middleware/protect"

const router = express.Router()
router.get("/", protect, getVisitors)
router.post("/", addVisitor)

export default router