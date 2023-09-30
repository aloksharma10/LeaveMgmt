import mongoose, { Schema } from "mongoose";

const LeaveSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    vacationLeaveCount: {
      type: Number,
      default: 0,
    },
    casualLeaveCount: {
      type: Number,
      default: 0,
    },
    earnedLeaveCount: {
      type: Number,
      default: 0,
    },
    salaryDeduction: {
      type: Number,
      default: 0,
    },
    rejectedMessage: {
      type: String,
    },
    status: {
      enum: ["pending", "approved", "rejected"],
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Leave = mongoose.models.Leave || mongoose.model("Leave", LeaveSchema);

export default Leave;
