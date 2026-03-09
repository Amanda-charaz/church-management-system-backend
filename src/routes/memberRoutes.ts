import express from "express"
import { getMembers, addMember, updateMember, deleteMember } from "../controllers/memberController"
import { protect } from "../middleware/protect"

const router = express.Router()
router.get("/", protect, getMembers)
router.post("/", protect, addMember)
router.put("/:id", protect, updateMember)
router.delete("/:id", protect, deleteMember)

export default router