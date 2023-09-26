"use server";

const { default: dbConn } = require("@/lib/db/dbConn");
import LeavePolicy from "@/lib/models/LeavePolicySchema";
import Leave from "@/lib/models/LeaveSchema";
import UserSchema from "@/lib/models/UserSchema";

let conn = false;

async function connect() {
  try {
    await dbConn();
    conn = true;
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error("MongoDB connection failed", error);
  }
}

function getDaysExcludingSatSun(startDate, endDate) {
  let count = 0;
  while (startDate <= endDate) {
    let day = startDate.getDay();
    if (day !== 0 && day !== 6) {
      count++;
    }
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
  }
  return count;
}

export async function applyLeave(formData) {
  try {
    if (!conn) await connect();
    const { userId, startDate, endDate, message } = formData;
    const user = await UserSchema.findById(userId);
    if (!user) {
      return {
        status: 400,
        message: "User not found",
      };
    }

    if (startDate > endDate) {
      return {
        status: 400,
        message: "Start date must be less than end date",
      };
    }

    const getDays = getDaysExcludingSatSun(
      new Date(startDate),
      new Date(endDate)
    );
    let reqLeaveDays = getDays;

    const { casualLeave, earnedLeave, vacationLeave } =
      user.leave.availableLeaves;

    const { vacation, casual, earned, salaryDeductionRate } =
      await LeavePolicy.findOne().sort({ createdAt: -1 });

    let casualLeaveCount = 0;
    let earnedLeaveCount = 0;
    let vacationLeaveCount = 0;
    let salaryDeduction = 0;

    let currentMonth = new Date().getMonth();

    if (reqLeaveDays > 0 && vacation.allowedMonths.includes(currentMonth)) {
      if (vacationLeave > 0) {
        vacationLeaveCount = Math.min(
          user.leave.availableLeaves.vacationLeave,
          vacation.allowedLeaveCount
        );
        reqLeaveDays -= vacationLeaveCount;
        user.leave.availableLeaves.vacationLeave -= vacationLeaveCount;
      }
    }
    if (reqLeaveDays > 0 && casualLeave > 0) {
      casualLeaveCount = Math.min(
        user.leave.availableLeaves.casualLeave,
        casual.allowedLeaveCount
      );
      reqLeaveDays -= casualLeaveCount;
      user.leave.availableLeaves.casualLeave -= casualLeaveCount;
    }
    if (reqLeaveDays > 0 && earnedLeave > 0) {
      earnedLeaveCount = Math.min(
        user.leave.availableLeaves.earnedLeave,
        earned.allowedLeaveCount
      );
      reqLeaveDays -= earnedLeaveCount;
      user.leave.availableLeaves.earnedLeave -= earnedLeaveCount;
    }

    if (reqLeaveDays > 0) {
      salaryDeduction = reqLeaveDays * salaryDeductionRate;
    }
    const leave = await Leave.create({
      user: userId,
      startDate,
      endDate,
      message,
      casualLeaveCount,
      earnedLeaveCount,
      vacationLeaveCount,
      salaryDeduction,
    });

    user.leave.totalTakenLeave.unshift(leave._id);
    await user.save();

    return {
      status: 200,
      message: "Leave request sent successfully",
    };
  } catch (error) {
    console.log("[Leave]", error);
    return {
      status: 400,
      message: "Something went wrong!",
    };
  }
}
