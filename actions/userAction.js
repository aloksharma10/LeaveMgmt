"use server";

import LeavePolicy from "@/lib/models/LeavePolicySchema";
import UserSchema from "@/lib/models/UserSchema";
import bcrypt from "bcrypt";
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

    const hashPass = bcrypt.hashSync(formData.get("password"), 12);

    const { vacation, casual, earned } = await LeavePolicy.findOne().sort({
      createdAt: -1,
    });
    const newUser = await UserSchema.create({
      name: formData.get("name"),
      role: formData.get("role"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: hashPass,
      leave: {
        totalTakenLeave: [],
        availableLeaves: {
          earnedLeave: earned.allowedLeaveCount,
          casualLeave: casual.allowedLeaveCount,
          vacationLeave: vacation.allowedLeaveCount,
        },
      },
    });
    return {
      status: 200,
      message: "User signup Successfully",
    };
  } catch (error) {
    return {
      status: 400,
      message: "Something went wrong!",
    };
  }
}

// Not in use dur to next-auth
// export async function userLogin(fromData) {
//   try {
//     if (!conn) await connect();
//     const email = fromData.get("email");
//     const password = fromData.get("password");
//     const role = fromData.get("role");
//     const exitingUser = await UserSchema.findOne({ email, role });
//     if (!exitingUser) {
//       return {
//         status: 404,
//         message: "User not found!",
//       };
//     }
//     const isMatch = await bcrypt.compare(password, exitingUser.password);
//     if (!isMatch) {
//       return {
//         status: 401,
//         message: "Password not match!",
//       };
//     }
//     if (!exitingUser.approved) {
//       return {
//         status: 400,
//         message: "Your account is not approved!",
//       };
//     }
//     const token = jwt.sign(
//       {
//         id: exitingUser._id,
//         name: exitingUser.name,
//         email: exitingUser.email,
//         role: exitingUser.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     // cookies().set({
//     //   name: "user_auth",
//     //   value: token,
//     //   path: "/",
//     //   secure: true,
//     // });
//     cookies().set('user_auth', token)
//     return {
//       status: 200,
//       message: "User login Successfully",
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       status: 500,
//       message: "Something went wrong!",
//     };
//   }
// }
