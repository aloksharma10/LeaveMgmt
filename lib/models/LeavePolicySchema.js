import mongoose, { Schema } from "mongoose";

const LeavePolicySchema = new Schema(
  {
    vacation: {
      allowedLeaveCount: {
        type: Number,
        default: 21,
      },
      allowedMonths: {
        type: [Number], 
        default: [4, 5, 6], // Default to May, June, July
      },
    },
    casual: {
      allowedLeaveCount: {
        type: Number,
        default: 8,
      },
      leaveCycleMonths: {
        type: Number,
        default: 3,
      },
    },
    earned: {
      allowedLeaveCount: {
        type: Number,
        default: 10,
      },
      leaveCycleMonths: {
        type: Number,
        default: 6,
      },
    },
    salaryDeductionRate: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

const LeavePolicy =
  mongoose.models.LeavePolicy ||
  mongoose.model("LeavePolicy", LeavePolicySchema);

export default LeavePolicy;
