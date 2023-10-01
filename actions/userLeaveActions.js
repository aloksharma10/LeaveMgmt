"use server";

import { revalidatePath } from "next/cache";

import UserSchema from "@/lib/models/UserSchema";
import Leave from "@/lib/models/LeaveSchema";
import LeavePolicy from "@/lib/models/LeavePolicySchema";

import dbConn from "@/lib/db/dbConn";
import { getDaysExcludingSatSun, getMonthName } from "./utils";

let conn = false;

async function connect() {
  try {
    await dbConn();
    conn = true;
  } catch (error) {
    throw new Error("MongoDB connection failed", error);
  }
}

export async function applyLeave(formData) {
  try {
    if (!conn) await connect();
    const { userId, startDate, endDate, message, title } = formData;
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

    if (
      reqLeaveDays > 0 &&
      vacation.allowedMonths.includes(currentMonth) &&
      user.leave.availableLeaves.allowedVacationPerMonth > 0
    ) {
      if (vacationLeave > 0) {
        vacationLeaveCount = Math.min(
          user.leave.availableLeaves.vacationLeave,
          user.leave.availableLeaves.allowedVacationPerMonth,
          reqLeaveDays,
          vacation.allowedLeaveCount
        );
        reqLeaveDays -= vacationLeaveCount;
        user.leave.availableLeaves.vacationLeave -= vacationLeaveCount;
        user.leave.availableLeaves.allowedVacationPerMonth -=
          vacationLeaveCount;
      }
    }
    if (
      reqLeaveDays > 0 &&
      casualLeave > 0 &&
      user.leave.availableLeaves.allowedCasualPerMonth > 0
    ) {
      casualLeaveCount = Math.min(
        user.leave.availableLeaves.casualLeave,
        user.leave.availableLeaves.allowedCasualPerMonth,
        reqLeaveDays,
        casual.allowedLeaveCount
      );
      reqLeaveDays -= casualLeaveCount;
      user.leave.availableLeaves.casualLeave -= casualLeaveCount;
      user.leave.availableLeaves.allowedCasualPerMonth -= casualLeaveCount;
    }
    if (
      reqLeaveDays > 0 &&
      earnedLeave > 0 &&
      user.leave.availableLeaves.allowedEarnedPerMonth > 0
    ) {
      earnedLeaveCount = Math.min(
        user.leave.availableLeaves.earnedLeave,
        user.leave.availableLeaves.allowedEarnedPerMonth,
        reqLeaveDays,
        earned.allowedLeaveCount
      );
      reqLeaveDays -= earnedLeaveCount;
      user.leave.availableLeaves.earnedLeave -= earnedLeaveCount;
      user.leave.availableLeaves.allowedEarnedPerMonth -= earnedLeaveCount;
    }

    if (reqLeaveDays > 0) {
      salaryDeduction = reqLeaveDays * salaryDeductionRate;
    }
    const leave = await Leave.create({
      user: userId,
      title,
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
    revalidatePath("/user/leave-request");

    return {
      status: 200,
      message: "Leave request sent successfully",
    };
  } catch (error) {
    return {
      status: 400,
      message: "Something went wrong!",
    };
  }
}

export async function leavePolicyCycle() {
  try {
    if (!conn) await connect();
    const { casual, earned, vacation } = await LeavePolicy.findOne().sort({
      createdAt: -1,
    });
    const vacationAllowedMonths = vacation.allowedMonths.map((monthNumber) =>
      getMonthName(monthNumber)
    );
    return {
      status: 200,
      vacationMonths: vacationAllowedMonths,
      vacationCount: vacation.allowedLeaveCount,
      earnedCycle: earned.leaveCycleMonths,
      earnedCount: earned.allowedLeaveCount,
      casualCycle: casual.leaveCycleMonths,
      casualCount: casual.allowedLeaveCount,
    };
  } catch (error) {
    return {
      status: 400,
      message: "Something went wrong!",
    };
  }
}

export async function getUserTakenLeaveData(userId) {
  try {
    if (!conn) await connect();
    const user = await UserSchema.findById(userId).populate(
      "leave.totalTakenLeave"
    );
    if (!user) {
      throw new Error("User not found");
    }

    const leaveData = user.leave.totalTakenLeave
      .filter((leave) => leave.status === "approved")
      .map((leaveId) => ({
        startDate: leaveId.startDate,
        endDate: leaveId.endDate,
      }));

    const leavePerMonth = new Array(12).fill(0);

    for (const leave of leaveData) {
      const startDate = new Date(leave.startDate);
      const startMonth = startDate.getMonth();

      leavePerMonth[startMonth]++;
    }

    // Convert the leave per month data to the desired format
    const formattedData = leavePerMonth.map((totalLeave, index) => ({
      name: getMonthName(index),
      leave: totalLeave,
    }));

    return formattedData;
  } catch (error) {
    throw new Error("Error retrieving user leave data: " + error.message);
  }
}

export async function getUserAvailableLeave(userId) {
  try {
    if (!conn) await connect();
    const user = await UserSchema.findById(userId);
    return {
      status: 200,
      data: user.leave.availableLeaves,
    };
  } catch (error) {
    return {
      status: 400,
      message: "Something went wrong!",
    };
  }
}

export async function getLeaveData(userId, dataLimit) {
  try {
    if (!conn) await connect();
    const leaveData = await UserSchema.findById(userId).populate({
      path: "leave.totalTakenLeave",
      options: { sort: { createdAt: -1 }, limit: dataLimit },
    });
    if (!leaveData) {
      throw new Error("User not found");
    }
    const leaveDataList = leaveData.leave.totalTakenLeave.map((leave) => ({
      id: String(leave._id),
      title: String(leave.title),
      startDate: String(new Date(leave.startDate).toLocaleDateString()),
      endDate: String(new Date(leave.endDate).toLocaleDateString()),
      message: String(leave.message),
      status: String(leave.status),
      casualLeaveCount: String(leave.casualLeaveCount),
      earnedLeaveCount: String(leave.earnedLeaveCount),
      vacationLeaveCount: String(leave.vacationLeaveCount),
      salaryDeduction: String(leave.salaryDeduction),
    }));
    return {
      status: 200,
      data: leaveDataList,
    };
  } catch (error) {
    return {
      status: 400,
      message: "Something went wrong!",
    };
  }
}

export async function getUserLeaveReport(
  userId,
  reportStartDate,
  reportEndDate
) {
  try {
    if (!conn) await connect();

    if (reportStartDate > reportEndDate) {
      return {
        status: 400,
        message: "Start date must be less than or equal to end date",
      };
    }
    const leaveData = await Leave.find({
      user: userId,
      startDate: { $gte: reportStartDate },
      endDate: { $lte: reportEndDate },
    }).sort({ createdAt: -1 });

    if (!leaveData || leaveData.length === 0) {
      return {
        status: 400,
        message: "No leave data found",
      };
    }

    const leaveDataList = leaveData.map((leave) => ({
      id: String(leave._id),
      title: String(leave.title),
      startDate: String(new Date(leave.startDate).toLocaleDateString()),
      endDate: String(new Date(leave.endDate).toLocaleDateString()),
      message: String(leave.message),
      status: String(leave.status),
      casualLeaveCount: String(leave.casualLeaveCount),
      earnedLeaveCount: String(leave.earnedLeaveCount),
      vacationLeaveCount: String(leave.vacationLeaveCount),
      salaryDeduction: String(leave.salaryDeduction),
      rejectedMessage: String(leave.rejectedMessage),
    }));
    return {
      status: 200,
      data: leaveDataList,
    };
  } catch (error) {
    return {
      status: 400,
      message: error.message || "Something went wrong!",
    };
  }
}

export async function deleteLeave(leaveId, userId) {
  try {
    const deleteLeave = await Leave.findByIdAndDelete(leaveId);
    if (!deleteLeave) {
      return {
        status: 400,
        message: "Leave not found",
      };
    }
    const user = await UserSchema.findById(userId);
    if (!user) {
      return {
        status: 400,
        message: "User not found",
      };
    }

    if (deleteLeave.status !== "approved") {
      user.leave.availableLeaves.casualLeave += deleteLeave.casualLeaveCount;
      user.leave.availableLeaves.earnedLeave += deleteLeave.earnedLeaveCount;
      user.leave.availableLeaves.vacationLeave +=
        deleteLeave.vacationLeaveCount;
      user.leave.availableLeaves.allowedCasualPerMonth +=
        deleteLeave.casualLeaveCount;
      user.leave.availableLeaves.allowedEarnedPerMonth +=
        deleteLeave.earnedLeaveCount;
    }

    const leaveIndex = user.leave.totalTakenLeave.indexOf(leaveId);
    user.leave.totalTakenLeave.splice(leaveIndex, 1);
    await user.save();
    revalidatePath(["/user/leave-request", "/user/reports"]);
    return {
      status: 200,
      message: "Leave deleted successfully",
    };
  } catch (error) {
    return {
      status: 400,
      message: "Something went wrong!",
    };
  }
}
