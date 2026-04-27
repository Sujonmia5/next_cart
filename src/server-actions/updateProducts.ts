"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateProduct(id: string, formData: FormData) {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    const baseUrl = process.env.BASE_URL;
    const response = await fetch(`${baseUrl}/api/products/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        ...(authToken && { Cookie: `auth-token=${authToken}` }),
      },
    });

    const data = await response.json();

    if (data.success) {
      revalidatePath("/dashboard/items/manage");
      revalidatePath("/shop");
    }

    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
