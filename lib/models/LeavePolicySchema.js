import mongoose, { Schema } from "mongoose";

const LeavePolicySchema = new Schema(
  {
    leaveType: {
      type: String,
      enum: ["casual", "earned", "vacation"],
      required: true,
    },
    allowedLeave: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.leavePolicy ||
  mongoose.model("leavePolicy", LeavePolicySchema);
