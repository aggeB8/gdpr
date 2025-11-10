import express from "express"
import {
    createYap,
    deleteYap,
    getYaps,
    LikeYap,
    ReplyYap
} from "../Controllers/yapController.js"
import authMiddleware from "../middleware/authMiddlewear.js"

const router = express.Router()

router.post("/", authMiddleware, createYap)
router.get("/", authMiddleware, getYaps)
router.post("/:id/reply", authMiddleware, ReplyYap)

router.delete("/:id", authMiddleware, deleteYap)
router.put("/:id/like", authMiddleware, LikeYap)

export default router
