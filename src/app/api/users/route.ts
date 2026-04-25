/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { dbConnect } from "@/lib/mongoose";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { protect } from "@/utils/apiProtection";
import { USER_ROLE } from "@/types/user.interface";
import { User_Role } from "@/utils/utils.constents";

export const GET = protect(
  async (req: NextRequest) => {
    dbConnect();
    const users = await User.find();

    const responseData = {
      success: true,
      message: "Users fetched successfully",
      data: users,
      statusCode: 200,
    };
    return NextResponse.json(responseData, { status: 200 });
  },
  {
    roles: [User_Role.admin],
  },
);
