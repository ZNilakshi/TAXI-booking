import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      default: 'user' 
    },
    image: { 
      type: String, 
      default: "/logo.png"  // Set a default profile picture
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
