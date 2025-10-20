import express from "express";
import { registerUser, loginUser } from "../Controllers/authController.js";  // LÄGG TILL .js

const router = express.Router();

// POST /api/auth/register - Registrera ny användare
router.post("/register", registerUser);

// POST /api/auth/login - Logga in användare  
router.post("/login", loginUser);

export default router;