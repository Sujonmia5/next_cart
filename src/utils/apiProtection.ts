/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getFirebaseUser, TDecodedToken } from "@/lib/firebase.auth";

import { IUser, USER_ROLE } from "@/types/user.interface";
import { AppError } from "@/lib/error";
import { handleError } from "@/lib/errorHandler";
import UserModel from "@/models/user.model";
import { dbConnect } from "@/lib/mongoose";

// ─── Auth Guards ───
export async function requireAuth(req: NextRequest) {
  let user: any;

  user = (await getFirebaseUser(req)) as TDecodedToken | IUser;

  // Check if user exists in database
  if (user?.email) {
    await dbConnect();
    user = (await UserModel.isUserExistByEmail(user.email)) as IUser;
    if (!user) {
      throw new AppError(401, "User not found in database");
    }
    return user;
  }

  if (!user) {
    throw new AppError(401, "Login required");
  }
}

export async function requireRole(req: NextRequest, roles: USER_ROLE[]) {
  const user = await requireAuth(req);
  console.log(roles);
  console.log(user.role);

  if (!roles.includes(user.role as USER_ROLE)) {
    throw new AppError(403, "Access denied");
  }

  return user;
}

export type apiHandler<T extends unknown[]> = (
  req: NextRequest,
  user: TDecodedToken | IUser | null,
  ...args: T
) => Promise<NextResponse>;

// ─── Protect Wrapper ───

export function protect<T extends unknown[]>(
  handler: apiHandler<T>,
  options?: {
    roles?: USER_ROLE[];
  },
) {
  return async (req: NextRequest, ...args: T) => {
    let user: TDecodedToken | IUser | null = null;
    try {
      if (options?.roles && options.roles.length > 0) {
        user = await requireRole(req, options.roles);
      } else if (options?.roles !== undefined && options?.roles?.length === 0) {
        // roles: [] মানে শুধু login লাগবে
        user = await requireAuth(req);
      } else {
        // public কিন্তু user optional
        user = await getFirebaseUser(req);
      }
    } catch (err) {
      const { message, statusCode } = handleError(err);
      return NextResponse.json(
        { success: false, message },
        { status: statusCode },
      );
    }

    try {
      return await handler(req, user, ...args);
    } catch (err) {
      const { message, statusCode } = handleError(err);
      return NextResponse.json(
        { success: false, message },
        { status: statusCode },
      );
    }
  };
}
