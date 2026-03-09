import express from "express"
import { getFinances, addFinance, deleteFinance } from "../controllers/financeController"
import { protect } from "../middleware/protect"

const router = express.Router()
router.get("/", protect, getFinances)
router.post("/", protect, addFinance)
router.delete("/:id", protect, deleteFinance)

export default router
