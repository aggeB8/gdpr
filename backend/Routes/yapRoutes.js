import express from "express";
import { createYap, deleteYap, getYaps,LikeYap ,ReplyYap} from "../Controllers/yapController.js";

const router = express.Router();

router.post("/", createYap);
router.get("/", getYaps);
router.post("/:id/reply", ReplyYap);

router.delete("/:id", deleteYap);
router.put("/:id/like", LikeYap);

export default router;
