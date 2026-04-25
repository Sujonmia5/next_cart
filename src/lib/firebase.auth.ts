import { NextRequest } from "next/server";
import admin from "./firebase.admin";

export type TDecodedToken = {
  uid: string;
  email: string;
  role: string;
};

export const getFirebaseUser = async (
  req: NextRequest,
): Promise<TDecodedToken | null> => {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) {
    return null;
  }
  try {
    console.log(token);
    const decoded = await admin.auth().verifyIdToken(token);
    console.log(decoded);
    return {
      uid: decoded.uid,
      email: decoded.email as string,
      role: decoded.role as string,
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Unauthorized");
  }
};
