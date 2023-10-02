import mongoose, { Schema } from "mongoose";

const LeavePolicySchema = new Schema(
  {
    vacation: {
      perMonth: {
        type: Number,
        default: 2,
      },
      allowedLeaveCount: {
        type: Number,
        default: 20,
      },
      allowedMonths: {
        type: [Number], 
        default: [4, 5, 6],
      },
    },
    casual: {
      perMonth: {
        type: Number,
        default: 2,
      },
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
      perMonth: {
        type: Number,
        default: 5,
      },
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
