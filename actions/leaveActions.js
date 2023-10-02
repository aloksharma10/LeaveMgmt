"use server";

import LeavePolicy from "@/lib/models/LeavePolicySchema";
const { default: dbConn } = require("@/lib/db/dbConn");

let conn = false;
async function connect() {
  try {
    await dbConn();
    conn = true;
  } catch (error) {
    throw new Error("MongoDB connection failed", error);
  }
}

export async function createLeavePolicy() {
  try {
    if (!conn) await connect();
    const newLeavePolicy = await LeavePolicy.create({
      vacation: {
        perMonth: 21,
        allowedLeaveCount: 21,
        allowedMonths: [4, 5, 6],
      },
      casual: {
        perMonth: 2,
        allowedLeaveCount: 8,
        leaveCycleMonths: 3,
      },
      earned: {
        perMonth: 5,
        allowedLeaveCount: 10,
        leaveCycleMonths: 6,
      },
      salaryDeductionRate: 100,
    });
    console.log("New Leave Policy created", newLeavePolicy);
  } catch (error) {}
}
