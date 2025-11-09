import express from "express";
import { getDataAccess, deleteAccount, exportData } from "../Controllers/gdprController.js";
import authMiddleware from "../middleware/authMiddlewear.js";
const router = express.Router();

router.post("/consent", (req, res) => {
  console.log("Consent mottaget:", req.body);
  res.status(200).json({ message: "Consent sparat!" });
});

// Data Access Request endpoint (GDPR Article 15)
router.get("/users/:id/data-access", authMiddleware, getDataAccess);

// Data Deletion Request endpoint (GDPR Article 17)
router.delete("/users/:id/account", authMiddleware, deleteAccount);

// Data Portability endpoint (GDPR Article 20)
router.get("/users/:id/export", authMiddleware, exportData);

export default router;