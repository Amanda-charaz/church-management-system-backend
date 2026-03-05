import express from "express"
import { getFinances } from "../controllers/financeController"

const router = express.Router()

router.get("/", getFinances)

export default router