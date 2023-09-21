import mongoose, { Schema } from "mongoose";

const LeaveSchema = new Schema(
  {
    timings: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
    status: {
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    message:{
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.leave || mongoose.model("leave", LeaveSchema);
