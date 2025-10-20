import express from "express";
import { createYap } from "../Controllers/yapController.js";

const router = express.Router();

router.post("/", createYap);
router.get("/", getYaps);

export default router;
