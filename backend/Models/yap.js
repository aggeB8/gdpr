import mongoose, { mongo } from "mongoose";

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
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    replies: {
      type:[
        {
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",

          },
          content:String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        }
      ],
      default: [],
    },
    repliesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Yap", yapSchema);
