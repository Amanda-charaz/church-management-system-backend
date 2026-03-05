import express from "express"
import { getVisitors } from "../controllers/visitorController"

const router = express.Router()

router.get("/", getVisitors)

export default router