"use server";

import dbConn from "@/lib/db/dbConn";
import LeavePolicy from "@/lib/models/LeavePolicySchema";
import Leave from "@/lib/models/LeaveSchema";
import UserSchema from "@/lib/models/UserSchema";
import { revalidatePath } from "next/cache";
import { getMonthName } from "./utils";

let conn = false;

async function connect() {
  try {
    await dbConn();
    conn = true;
  } catch (error) {
    throw new Error("MongoDB connection failed", error);
  }
}

export async function getUsersByLeaveCriteria() {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  try {
    if (!conn) await connect();

    const usersOnLeaveLastMonth = await Leave.find({
      status: "approved",
      startDate: {
        $gte: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1),
      },
      endDate: { $lte: new Date(today.getFullYear(), today.getMonth(), 0) },
    }).populate("user");

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);
    const usersMoreThan3DaysLeave = await Leave.find({
      status: "approved",
      startDate: { $gte: threeDaysAgo },
      endDate: { $lte: today },
    }).populate("user");

    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(today.getDate() - 5);
    const usersMoreThan5DaysLeave = await Leave.find({
      status: "approved",
      startDate: { $gte: fiveDaysAgo },
      endDate: { $lte: today },
      user: {
        $nin: usersMoreThan3DaysLeave.map((userLeave) => userLeave.user),
      },
    }).populate("user");

    const usersCurrentlyOnLeave = await Leave.find({
      status: "approved",
      startDate: { $lte: today },
      endDate: { $gte: today },
    }).populate("user");

    return {
      usersOnLeaveLastMonth,
      usersMoreThan3DaysLeave,
      usersMoreThan5DaysLeave,
      usersCurrentlyOnLeave,
    };
  } catch (error) {
    console.error("Error retrieving users by leave criteria:", error);
    throw error;
  }
}

export async function getAdminUserLeaveData() {
  try {
    if (!conn) await connect();

    const users = await UserSchema.find().populate("leave.totalTakenLeave");
    if (!users) {
      throw new Error("No users found");
    }

    const monthLeavesData = new Array(12)
      .fill(0)
      .map(() => ({ leave: 0, role: "" }));

    for (const user of users) {
      const leaveData = user.leave.totalTakenLeave
        .filter((leave) => leave.status === "approved")
        .map((leaveId) => ({
          startDate: new Date(leaveId.startDate),
          endDate: new Date(leaveId.endDate),
        }));

      for (const leave of leaveData) {
        const startDate = leave.startDate;
        const endDate = leave.endDate;

        let currentMonth = startDate.getMonth();
        let currentYear = startDate.getFullYear();

        while (startDate <= endDate) {
          const month = startDate.getMonth();
          if (
            month === currentMonth &&
            startDate.getFullYear() === currentYear
          ) {
            monthLeavesData[month].leave++;
            monthLeavesData[month].role = user.role;
          }
          startDate.setMonth(startDate.getMonth() + 1);

          if (startDate.getMonth() !== currentMonth) {
            currentMonth = startDate.getMonth();
            currentYear = startDate.getFullYear();
          }
        }
      }
    }

    const formattedData = monthLeavesData.map((monthData, index) => ({
      name: getMonthName(index),
      leave: monthData.leave,
      role: monthData.role,
    }));
    return {
      status: 200,
      data: formattedData,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
}

export async function getRecentUpdates(dataLimit = 5) {
  try {
    if (!conn) await connect();
    const leaveData = await Leave.find()
      .populate({ path: "user" })
      .sort({ createdAt: -1 })
      .limit(dataLimit);
    if (!leaveData) {
      throw new Error("User not found");
    }
    const leaveDataList = leaveData.map((leave) => ({
      id: String(leave._id),
      userName: String(leave.user.name),
      role: String(leave.user.role),
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
    console.log(error);
    return {
      status: 400,
      message: "Something went wrong!",
    };
  }
}

export async function getUserForApproval() {
  try {
    if (!conn) await connect();
    const users = await UserSchema.find({ approved: false }).sort({
      createdAt: -1,
    });
    const allUsers = await UserSchema.find().sort({ createdAt: -1 });

    const allUserList = allUsers.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      totalTakenLeave: user.leave.totalTakenLeave.length,
      approved: user.approved,
      casualLeave: user.leave.availableLeaves.casualLeave,
      earnedLeave: user.leave.availableLeaves.earnedLeave,
      vacationLeave: user.leave.availableLeaves.vacationLeave,
    }));

    if (!users) throw new Error("No users found");
    return {
      status: 200,
      approvalUser: JSON.stringify(users),
      allUsers: JSON.stringify(allUserList),
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
}

export async function approveUser(userId) {
  try {
    if (!conn) await connect();
    const user = await UserSchema.findByIdAndUpdate(userId, {
      approved: true,
    });
    if (!user) throw new Error("User not found");
    revalidatePath("/admin/user-management");
    return {
      status: 200,
      message: "User approved successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function disapproveUser(userId) {
  try {
    if (!conn) await connect();
    const user = await UserSchema.findByIdAndUpdate(userId, {
      approved: false,
    });
    if (!user) throw new Error("User not found");
    revalidatePath("/admin/user-management");
    return {
      status: 200,
      message: "User disapproved successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function deleteUser(userId) {
  try {
    if (!conn) await connect();
    const user = await UserSchema.findByIdAndDelete(userId);
    if (!user) throw new Error("User not found");
    revalidatePath("/admin/user-management");
    return {
      status: 200,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function getLeavePolicy() {
  try {
    if (!conn) await connect();
    const leavePolicy = await LeavePolicy.findOne();
    if (!leavePolicy) throw new Error("Leave Policy not found");
    return {
      status: 200,
      data: JSON.stringify(leavePolicy),
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function updateLeavePolicy(leavePolicyData) {
  try {
    if (!conn) await connect();
    const leavePolicy = await LeavePolicy.findOne();
    if (!leavePolicy) throw new Error("Leave Policy not found");
    leavePolicy.vacation.perMonth = leavePolicyData.vacation_per_month;
    leavePolicy.vacation.allowedLeaveCount =
      leavePolicyData.vacation_allowedLeaveCount;
    leavePolicy.vacation.allowedMonths = leavePolicyData.vacation_allowedMonths;
    leavePolicy.casual.perMonth = leavePolicyData.casual_per_month;
    leavePolicy.casual.allowedLeaveCount =
      leavePolicyData.casual_allowedLeaveCount;
    leavePolicy.casual.leaveCycleMonths =
      leavePolicyData.casual_leaveCycleMonths;
    leavePolicy.earned.perMonth = leavePolicyData.earned_per_month;
    leavePolicy.earned.allowedLeaveCount =
      leavePolicyData.earned_allowedLeaveCount;
    leavePolicy.earned.leaveCycleMonths =
      leavePolicyData.earned_leaveCycleMonths;
    leavePolicy.salaryDeductionRate = leavePolicyData.salaryDeductionRate;
    await leavePolicy.save();
    revalidatePath("/admin/leaves");
    return {
      status: 200,
      message: "Leave policy updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function getUserForLeaveApproval() {
  try {
    if (!conn) await connect();
    const pendingLeaveData = await Leave.find({
      status: "pending",
    }).populate("user");
    if (!pendingLeaveData) throw new Error("No users found");

    const usersForLeaveApproval = pendingLeaveData.map((leave) => ({
      id: leave._id,
      name: leave.user.name,
      role: leave.user.role,
      title: leave.title,
      startDate: new Date(leave.startDate).toLocaleDateString(),
      endDate: new Date(leave.endDate).toLocaleDateString(),
      message: leave.message,
      status: leave.status,
      casualLeaveCount: leave.casualLeaveCount,
      earnedLeaveCount: leave.earnedLeaveCount,
      vacationLeaveCount: leave.vacationLeaveCount,
      salaryDeduction: leave.salaryDeduction,
    }));

    return {
      status: 200,
      data: JSON.stringify(usersForLeaveApproval),
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
}

export async function approveLeave(leaveId, status, message) {
  try {
    const leave = await Leave.findByIdAndUpdate(leaveId, {
      status: status,
      message: message,
    });
    if (!leave) throw new Error("Leave not found");
    revalidatePath("/admin/leaves");
    return {
      status: 200,
      message: "Leave approved successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function getAdminLeaveReport(reportStartDate, reportEndDate) {
  try {
    if (!conn) await connect();

    if (reportStartDate > reportEndDate) {
      return {
        status: 400,
        message: "Start date must be less than or equal to end date",
      };
    }

    const leaveData = await Leave.find({
      startDate: { $gte: reportStartDate },
      endDate: { $lte: reportEndDate },
    }).populate('user').sort({ createdAt: -1 });

    if (!leaveData || leaveData.length === 0) {
      return {
        status: 400,
        message: "No leave data found",
      };
    }

    const leaveDataList = leaveData.map((leave) => ({
      id: String(leave._id),
      role: String(leave.user.role),
      userName: String(leave.user.name),
      userEmail: String(leave.user.email),
      title: String(leave.title),
      startDate: String(new Date(leave.startDate).toLocaleDateString()),
      endDate: String(new Date(leave.endDate).toLocaleDateString()),
      message: String(leave.message),
      status: String(leave.status),
      casualLeaveCount: String(leave.casualLeaveCount),
      earnedLeaveCount: String(leave.earnedLeaveCount),
      vacationLeaveCount: String(leave.vacationLeaveCount),
      salaryDeduction: String(leave.salaryDeduction),
      rejectedMessage: String(leave.message),
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
