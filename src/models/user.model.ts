import { Schema, model, models } from "mongoose";
import { IUser } from "../types/user.interface";
import { User_Role } from "../utils/utils.constents";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Don't return password by default
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    is_block: {
      type: Boolean,
      default: false,
    },
    profile_img: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(User_Role),
      default: User_Role.user,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel = models.User || model<IUser>("User", userSchema);

export default UserModel;
