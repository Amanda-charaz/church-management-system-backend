import express from "express"
import { createVisitor, getVisitors } from "../controllers/visitorController"
import { authenticate, authorize } from "../middleware/auth"

const router = express.Router()

// PUBLIC — visitors can register
router.post("/", createVisitor)

// STAFF ONLY
router.get("/", authenticate, authorize("ADMIN", "PASTOR"), getVisitors)

export default router