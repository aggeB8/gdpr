import express from "express";
import { createYap } from "../Controllers/yapController.js";

const router = express.Router();

router.post("/", createYap);

export default router;
