import express from "express";
import dotenv from "dotenv";

import yapRoutes from "./Routes/yapRoutes.js";
import connectDB from "./Config/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use("/yaps", yapRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
