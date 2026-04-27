"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createProduct(formData: FormData) {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/products/create`, {
      method: "POST",
      body: formData,
      headers: {
        // Forward the auth token as cookie to pass the API protection
        ...(authToken && { Cookie: `auth-token=${authToken}` }),
      },
    });

    const data = await response.json();

    if (data.success) {
      // Revalidate cache to show the new product across all related pages
      revalidatePath("/dashboard/items/manage");
      revalidatePath("/shop"); // If you have a shop page, this will update it too
    }

    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}
