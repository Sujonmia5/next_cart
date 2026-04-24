/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { dbConnect } from "@/lib/mongoose";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    dbConnect();
    const users = await User.find();

    const responseData = {
      success: true,
      message: "Users fetched successfully",
      data: users,
      statusCode: 200,
    };
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error(error);
    const errorResponse = {
      success: false,
      message: "Failed to get users",
      error: error,
      statusCode: 500,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
};
