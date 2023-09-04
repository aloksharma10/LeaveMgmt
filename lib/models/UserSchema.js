import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["staff", "faculty", "admin"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
    },
    leave: {
      totalTakenLeave: {
        type: [mongoose.Schema.ObjectId],
        ref: "leave",
      },
      avaiableLeaves: {
        earnedLeave: {
          type: Number,
          default: 0,
        },
        casualLeave: {
          type: Number,
          default: 0,
        },
        vacationLeave: {
          type: Number,
          default: 0,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);