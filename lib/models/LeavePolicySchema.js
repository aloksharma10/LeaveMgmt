import mongoose, { Schema } from "mongoose";

const LeavePolicySchema = new Schema(
  {
    leaveType: {
      type: String,
      enum: ["casual", "earned", "vacation"],
      required: true,
    },
    maxLeave: {
      type: Number,
      default: 0,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    resetDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.leavePolicy ||
  mongoose.model("leavePolicy", LeavePolicySchema);
