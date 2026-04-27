/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { dbConnect } from "@/lib/mongoose";
import ProductModel from "@/models/product.model";
import { protect } from "@/utils/apiProtection";
import { TDecodedToken } from "@/lib/firebase.auth";
import { IUser } from "@/types/user.interface";

// ─── GET /api/products ─── (Public)

const getProducts = protect(
  async (req: NextRequest, _user: TDecodedToken | IUser | null) => {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit") ?? 10)),
    );
    const skip = (page - 1) * limit;
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");
    const ids = searchParams.get("ids");

    const filter: Record<string, any> = {};

    if (ids) {
      filter._id = { $in: ids.split(",") };
    }

    if (priority && ["low", "medium", "high"].includes(priority)) {
      filter.priority = priority;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
      ];
    }

    const [products, total] = await Promise.all([
      ProductModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProductModel.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  },
);

export const GET = getProducts;
