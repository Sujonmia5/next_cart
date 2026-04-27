/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import admin from "@/lib/firebase.admin";
import { dbConnect } from "@/lib/mongoose";
import UserModel from "@/models/user.model";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    // 1. Verify token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture } = decodedToken;

    if (!email) {
      return Response.json(
        { success: false, message: "Invalid token: Email missing" },
        { status: 400 },
      );
    }

    // 2. Sync with MongoDB
    await dbConnect();
    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        email,
        name: name || email.split("@")[0],
        profile_img: picture,
        is_verified: true,
        // Password is not needed for social login
      });
    }

    // 3. Set cookie
    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return Response.json({ success: true, data: user });
  } catch (error: any) {
    console.error("Error in login-verify:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
