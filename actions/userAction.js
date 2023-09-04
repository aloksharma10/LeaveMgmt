"use server"
const { default: dbConn } = require("@/lib/db/dbConn");

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

export async function userSignup(formData) {
  try {
    if (!conn) await connect();
    console.log(formData);
  } catch (error) {}
}
