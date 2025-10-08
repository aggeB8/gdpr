import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch {
    console.error("Error connecting DB.");
  }
};

export default connectDB;
