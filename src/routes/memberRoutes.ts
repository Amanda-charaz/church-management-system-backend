import express from "express"
import { getMembers } from "../controllers/memberController"

const router = express.Router()

router.get("/", getMembers)

export default router