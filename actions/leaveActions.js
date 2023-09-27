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
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Convert the leave per month data to the desired format
    const formattedData = leavePerMonth.map((totalLeave, index) => ({
      name: monthNames[index],
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
      options: { limit: dataLimit },
    });
    if (!leaveData) {
      throw new Error("User not found");
    }
    const leaveDataList = leaveData.leave.totalTakenLeave.map((leave) => ({
      id: String(leave._id),
      title: leave.title,
      startDate: leave.startDate,
      endDate: leave.endDate,
      message: leave.message,
      status: leave.status,
      casualLeaveCount: leave.casualLeaveCount,
      earnedLeaveCount: leave.earnedLeaveCount,
      vacationLeaveCount: leave.vacationLeaveCount,
      salaryDeduction: leave.salaryDeduction,
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

// helper functions

function getMonthName(monthNumber) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthNumber];
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
