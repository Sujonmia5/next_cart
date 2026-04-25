import { v2 as cloudinary } from "cloudinary";

// ─── Configure once (singleton safe in Next.js) ───────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export { cloudinary };

// ─── Upload a single Buffer/base64 to Cloudinary ─────────────────────────
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  options?: {
    folder?: string;
    public_id?: string;
    transformation?: object[];
  },
): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: options?.folder ?? "nex_cart/products",
      public_id: options?.public_id,
      transformation: options?.transformation ?? [
        { width: 1200, height: 1200, crop: "limit", quality: "auto:best" },
        { fetch_format: "auto" },
      ],
      resource_type: "image" as const,
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error || !result) {
          return reject(error ?? new Error("Cloudinary upload failed"));
        }
        resolve({ url: result.secure_url, public_id: result.public_id });
      },
    );

    uploadStream.end(fileBuffer);
  });
}

// ─── Delete an image from Cloudinary by public_id ────────────────────────
export async function deleteFromCloudinary(public_id: string): Promise<void> {
  await cloudinary.uploader.destroy(public_id, { resource_type: "image" });
}
