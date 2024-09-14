import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    message: {
        type: String,
        required: false,
      },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", messageSchema);