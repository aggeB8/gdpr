import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../Controllers/authController.js";  
import authMiddleware from "../middleware/authMiddlewear.js";

const router = express.Router();

// POST /api/auth/register - Registrera ny användare
router.post("/register", registerUser);

// POST /api/auth/login - Logga in användare  
router.post("/login", loginUser);

// GET /api/auth/me - Hämta nuvarande användare (skyddad route)
router.get("/me", authMiddleware, getCurrentUser);


export default router;