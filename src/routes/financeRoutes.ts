import express from "express"
import {
  getFinances,
  createFinance,
  updateFinance,
  deleteFinance
} from "../controllers/financeController"

const router = express.Router()

router.get("/", getFinances)
router.post("/", createFinance)
router.put("/:id", updateFinance)
router.delete("/:id", deleteFinance)

export default router