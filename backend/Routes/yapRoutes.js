import express from "express";
import { createYap, deleteYap, getYaps } from "../Controllers/yapController.js";

const router = express.Router();

router.post("/", createYap);
router.get("/", getYaps);
router.delete("/:id", deleteYap);

export default router;
