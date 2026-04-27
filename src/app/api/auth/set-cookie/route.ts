import { cookies } from "next/headers";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return Response.json({ success: true });
}
