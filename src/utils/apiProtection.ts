import { NextRequest, NextResponse } from "next/server";
import { getFirebaseUser, TDecodedToken } from "@/lib/firebase.auth";

import { USER_ROLE } from "@/types/user.interface";
import { AppError } from "@/lib/error";
import { handleError } from "@/lib/errorHandler";

// ─── Auth Guards ───
export async function requireAuth(req: NextRequest) {
  const user = await getFirebaseUser(req);

  if (!user) {
    throw new AppError(401, "Login required");
  }

  return user;
}

export async function requireRole(req: NextRequest, roles: USER_ROLE[]) {
  const user = await requireAuth(req);

  if (!roles.includes(user.role as USER_ROLE)) {
    throw new AppError(403, "Access denied");
  }

  return user;
}

export type apiHandler<T extends unknown[]> = (
  req: NextRequest,
  user: TDecodedToken | null,
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
    let user: TDecodedToken | null = null;
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
      console.log(err);
      const { message, statusCode } = handleError(err);
      return NextResponse.json(
        { success: false, message },
        { status: statusCode },
      );
    }

    try {
      return await handler(req, user, ...args);
    } catch (err) {
      console.log(err);
      const { message, statusCode } = handleError(err);
      return NextResponse.json(
        { success: false, message },
        { status: statusCode },
      );
    }
  };
}
