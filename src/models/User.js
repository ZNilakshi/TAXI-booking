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
      enum: ['user', 'admin'], default: 'user'
     },

  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
