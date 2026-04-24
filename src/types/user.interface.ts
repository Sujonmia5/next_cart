import mongoose from "mongoose";
import { User_Role } from "./utils.constents";

export type Role = (typeof User_Role)[keyof typeof User_Role];

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  gender?: string;
  status?: string;
  is_verified?: boolean;
  is_block?: boolean;
  profile_img?: string;
  role: Role;
}
