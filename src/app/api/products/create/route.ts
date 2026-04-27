/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { TProduct } from "@/types/product.interface";

// ─── Constants
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGES = 5;

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

/** Upload an array of File objects to Cloudinary and return their URLs */
async function uploadImages(files: File[]): Promise<string[]> {
  const results = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return uploadToCloudinary(buffer, { folder: "nex_cart/products" });
    }),
  );
  return results.map((r) => r.url);
}

// ─── POST /api/products/create ── (Admin | Superadmin)
export const POST = protect(
  async (req: NextRequest, user: TDecodedToken | IUser | null) => {
    await dbConnect();

    const formData = await req.formData().catch(() => {
      throw new AppError(400, "Failed to parse form data");
    });

    const itemData: TProduct = JSON.parse(formData.get("data") as string);

    if (
      !itemData.title ||
      !itemData.shortDescription ||
      !itemData.fullDescription
    )
      throw new AppError(
        400,
        "title, shortDescription, and fullDescription are required",
      );

    const files = extractImages(formData);
    const imageUrl = files.length ? await uploadImages(files) : [];

    const product = await ProductModel.create({
      title: itemData.title,
      shortDescription: itemData.shortDescription,
      fullDescription: itemData.fullDescription,
      price: itemData.price ? Number(itemData.price) : 0,
      date: itemData.date ? new Date(itemData.date) : new Date(),
      priority: itemData.priority || "low",
      imageUrl,
    });

    return NextResponse.json(
      { success: true, message: "Product created successfully", data: product },
      { status: 201 },
    );
  },
  { roles: [User_Role.admin, User_Role.superadmin] },
);
