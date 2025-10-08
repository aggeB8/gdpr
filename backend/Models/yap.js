import mongoose from "mongoose";

// YAP post - innehåll, användare, timestamp.
const yapSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: 300,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Yap", yapSchema);
