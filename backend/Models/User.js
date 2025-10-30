import mongoose from "mongoose";

// Användarmodell - namn, e-post, lösenord.
//

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ingen duplicerad e-post
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    bio: { type: String, default: "" }, 
    avatar: { type: String, default: "" },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true, // automatiska created/updated datum
  }
);
;

const User = mongoose.model("User", UserSchema);
export default User;


