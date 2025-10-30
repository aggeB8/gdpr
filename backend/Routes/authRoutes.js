import express from "express";
import { registerUser, loginUser } from "../Controllers/authController.js";
import { verifyRecaptcha } from "../Middleware/reCaptcha.js";

const router = express.Router();

// POST /api/auth/register - Registrera ny användare
router.post("/register", verifyRecaptcha, registerUser);

// POST /api/auth/login - Logga in användare
router.post("/login", verifyRecaptcha, loginUser);

export default router;
