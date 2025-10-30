import express from "express";
const router = express.Router();

router.post("/consent", (req, res) => {
  console.log("Consent mottaget:", req.body);
  res.status(200).json({ message: "Consent sparat!" });
});

export default router;