export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/user.model";
import { UserValidation } from "@/validators/user.schema";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const body = await req.json();
    const parseData = UserValidation.createUserSchema.parse(body);

    const user = await User.create(parseData);
    const responseData = {
      success: true,
      message: "User created successfully",
      data: user,
      statusCode: 201,
    };
    return Response.json(responseData, { status: 201 });
  } catch (error) {
    console.error(error);
    const errorResponse = {
      success: false,
      message: "Failed to create user",
      error: error,
      statusCode: 500,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
};
