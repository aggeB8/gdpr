import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./Routes/authRoutes.js";
import yapRoutes from "./Routes/yapRoutes.js";
import gdprRoutes from "./Routes/gdprRoutes.js";
import connectDB from "./Config/db.js";

dotenv.config();
connectDB();

// Rate limiting för DDoS-skydd
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuter
  max: 100, // Max 100 requests per IP per 15 min
  message: "Too many requests from this IP, please try again later.",
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Säkerhets-middleware
app.use(helmet());
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/yaps", yapRoutes);
app.use("/api/gdpr", gdprRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
