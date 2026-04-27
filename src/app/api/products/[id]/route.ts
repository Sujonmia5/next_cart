import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { dbConnect } from "@/lib/mongoose";
import ProductModel from "@/models/product.model";
import { protect } from "@/utils/apiProtection";
import { TDecodedToken } from "@/lib/firebase.auth";
import { IUser } from "@/types/user.interface";
import { User_Role } from "@/utils/utils.constents";
import { AppError } from "@/lib/error";
import { uploadToCloudinary } from "@/lib/cloudinary";
import mongoose from "mongoose";

// ─── Types
type RouteContext = { params: Promise<{ id: string }> };

// ─── Constants
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_IMAGES = 5;

const UPDATABLE_TEXT_FIELDS = [
  "title",
  "shortDescription",
  "fullDescription",
  "price",
  "date",
  "priority",
] as const;

// ─── Helpers

function assertValidObjectId(id: string): void {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new AppError(400, "Invalid product ID");
}

/** Parse & validate image files from FormData */
function extractImages(formData: FormData): File[] {
  const files = formData.getAll("images") as File[];

  if (!files.length) return [];

  if (files.length > MAX_IMAGES)
    throw new AppError(400, `Maximum ${MAX_IMAGES} images allowed`);

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type))
      throw new AppError(
        400,
        `Unsupported type "${file.type}". Use jpeg/png/webp/avif`,
      );
    if (file.size > MAX_FILE_SIZE)
      throw new AppError(400, `"${file.name}" exceeds the 5 MB limit`);
  }

  return files;
}

/** Upload File[] to Cloudinary → return secure URLs */
async function uploadImages(files: File[]): Promise<string[]> {
  const results = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return uploadToCloudinary(buffer, { folder: "nex_cart/products" });
    }),
  );
  return results.map((r) => r.url);
}

// ─── GET /api/products/[id] ── (Public)
export const GET = protect(
  async (_req: NextRequest, _user: TDecodedToken | IUser | null, ctx: RouteContext) => {
    await dbConnect();
    const { id } = await ctx.params;
    assertValidObjectId(id);

    const product = await ProductModel.findById(id);
    if (!product) throw new AppError(404, "Product not found");

    return NextResponse.json({ success: true, data: product });
  },
);

// ─── PUT /api/products/[id] ── (Admin | Superadmin)
export const PUT = protect(
  async (req: NextRequest, _user: TDecodedToken | IUser | null, ctx: RouteContext) => {
    await dbConnect();
    const { id } = await ctx.params;
    assertValidObjectId(id);

    const formData = await req.formData().catch(() => {
      throw new AppError(400, "Failed to parse form data");
    });

    // ── Build text update payload
    const updateData: Record<string, unknown> = {};

    for (const field of UPDATABLE_TEXT_FIELDS) {
      const value = formData.get(field);
      if (value === null) continue;

      if (field === "price") updateData[field] = Number(value);
      else if (field === "date") updateData[field] = new Date(value as string);
      else if (field === "title") updateData[field] = (value as string).trim();
      else updateData[field] = value;
    }

    // ── Handle images ────────────────────────────────────────────────────────
    const files = extractImages(formData);
    const replaceImages = formData.get("replaceImages") === "true";

    if (files.length > 0) {
      const newUrls = await uploadImages(files);

      if (replaceImages) {
        // Replace all existing images with newly uploaded ones
        updateData.imageUrl = newUrls;
      } else {
        // Append new images to existing ones
        const existing = await ProductModel.findById(id)
          .select("imageUrl")
          .lean();
        const existingUrls: string[] =
          (existing as { imageUrl?: string[] })?.imageUrl ?? [];
        updateData.imageUrl = [...existingUrls, ...newUrls];
      }
    }

    if (Object.keys(updateData).length === 0)
      throw new AppError(400, "No valid fields provided for update");

    const updated = await ProductModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!updated) throw new AppError(404, "Product not found");

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: updated,
    });
  },
  { roles: [User_Role.admin, User_Role.superadmin] },
);

// ─── DELETE /api/products/[id] ── (Admin | Superadmin)
export const DELETE = protect(
  async (_req: NextRequest, _user: TDecodedToken | IUser | null, ctx: RouteContext) => {
    await dbConnect();
    const { id } = await ctx.params;
    assertValidObjectId(id);

    const deleted = await ProductModel.findByIdAndDelete(id);
    if (!deleted) throw new AppError(404, "Product not found");

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  },
  { roles: [User_Role.admin, User_Role.superadmin] },
);
