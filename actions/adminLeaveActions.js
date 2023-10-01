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
    const usersOnLeaveLastMonthPromise = User.find({
      "leave.totalTakenLeave": {
        $elemMatch: {
          startDate: {
            $gte: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1),
          },
          endDate: { $lte: new Date(today.getFullYear(), today.getMonth(), 0) },
        },
      },
    });

    const usersMoreThan3DaysLeavePromise = User.find({
      "leave.totalTakenLeave": { $gt: 3 },
    });

    const usersMoreThan5DaysLeavePromise = User.find({
      "leave.totalTakenLeave": { $gt: 5 },
    });

    const [
      usersOnLeaveLastMonth,
      usersMoreThan3DaysLeave,
      usersMoreThan5DaysLeave,
    ] = await Promise.all([
      usersOnLeaveLastMonthPromise,
      usersMoreThan3DaysLeavePromise,
      usersMoreThan5DaysLeavePromise,
    ]);

    return {
      usersOnLeaveLastMonth,
      usersMoreThan3DaysLeave,
      usersMoreThan5DaysLeave,
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

    const monthLeavesCount = new Array(12).fill(0);

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

        // Calculate leaves for each month
        let currentMonth = startDate.getMonth();
        let currentYear = startDate.getFullYear();

        while (startDate <= endDate) {
          const month = startDate.getMonth();
          if (
            month === currentMonth &&
            startDate.getFullYear() === currentYear
          ) {
            monthLeavesCount[month]++;
          }
          startDate.setMonth(startDate.getMonth() + 1);

          // Update current month and year
          if (startDate.getMonth() !== currentMonth) {
            currentMonth = startDate.getMonth();
            currentYear = startDate.getFullYear();
          }
        }
      }
    }

    // Convert the leave per month data to the desired format
    const formattedData = monthLeavesCount.map((totalLeave, index) => ({
      month: getMonthName(index),
      leaveCount: totalLeave,
    }));
    console.log(formattedData);

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
