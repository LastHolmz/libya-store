"use server";

import { z } from "zod";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/database/categories";

// Create Category
export async function createCategoryAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      title: z.string().min(1, "Title is required"),
      slug: z.string().min(1, "Slug is required"),
      image: z.string().nullable().optional(),
    });

    const data = schema.safeParse({
      title: formData.get("title"),
      slug: formData.get("slug"),
      image: formData.get("image") || null,
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { title, slug, image } = data.data;
    if (!image) {
      return { message: "يجب رفع صورة" };
    }

    const res = await createCategory({ title, slug, image });
    return { message: res.message };
  } catch (error) {
    console.error("Error in createCategoryAction:", error);
    return { message: "Operation failed, please try again later" };
  }
}

// Update Category
export async function updateCategoryAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "Category ID is required"),
      title: z.string().min(1, "Title is required"),
      image: z.string().nullable().optional(),
      slug: z.string().min(1, "Slug is required"),
    });

    const data = schema.safeParse({
      id: formData.get("id"),
      title: formData.get("title"),
      image: formData.get("image") || null,
      slug: formData.get("slug"),
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id, title, image, slug } = data.data;

    if (!image) {
      return { message: "يجب رفع صورة" };
    }

    const res = await updateCategory({ id, title, image, slug });
    return { message: res.message };
  } catch (error) {
    console.error("Error in updateCategoryAction:", error);
    return { message: "Operation failed, please try again later" };
  }
}

// Delete Category
export async function deleteCategoryAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "Category ID is required"),
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

    const res = await deleteCategory(id);
    return { message: res.message };
  } catch (error) {
    console.error("Error in deleteCategoryAction:", error);
    return { message: "Operation failed, please try again later" };
  }
}
