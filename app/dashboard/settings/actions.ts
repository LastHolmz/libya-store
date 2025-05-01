"use server";

import { z } from "zod";
import { createPixel, deletePixel, updatePixel } from "@/database/pixels";

// Create Pixel
export async function createPixelAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      title: z.string().min(1, "العنوان مطلوب"),
      value: z.string().min(1, "القيمة مطلوبة"),
    });

    const data = schema.safeParse({
      title: formData.get("title"),
      value: formData.get("value"),
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { title, value } = data.data;
    const res = await createPixel({ title, value });

    return { message: res.message };
  } catch (error) {
    console.error("Error in createPixelAction:", error);
    return { message: "فشلت العملية، حاول لاحقًا" };
  }
}

// Update Pixel
export async function updatePixelAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "المعرف مطلوب"),
      title: z.string().min(1, "العنوان مطلوب"),
      value: z.string().min(1, "القيمة مطلوبة"),
    });

    const data = schema.safeParse({
      id: formData.get("id"),
      title: formData.get("title"),
      value: formData.get("value"),
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id, title, value } = data.data;
    const res = await updatePixel({ id, title, value });

    return { message: res.message };
  } catch (error) {
    console.error("Error in updatePixelAction:", error);
    return { message: "فشلت العملية، حاول لاحقًا" };
  }
}

// Delete Pixel
export async function deletePixelAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "المعرف مطلوب"),
    });

    const data = schema.safeParse({
      id: formData.get("id"),
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id } = data.data;
    const res = await deletePixel(id);

    return { message: res.message };
  } catch (error) {
    console.error("Error in deletePixelAction:", error);
    return { message: "فشلت العملية، حاول لاحقًا" };
  }
}
