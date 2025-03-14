import { z } from "zod";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/database/categories";

export async function createCategoryAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      title: z.string(),
      slug: z.string(),
      image: z.string().min(4),
    });

    const data = schema.safeParse({
      slug: formData.get("slug") || "",
      title: formData.get("title") || "",
      image: formData.get("image") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { title, image, slug } = data.data;

    const res = await createCategory({
      title,
      image,
      slug,
    });

    console.log("User created successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in createUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}

// Action to update a user
export async function updateCategoryAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      title: z.string(),
      id: z.string(),

      image: z.string().min(4),
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
      title: formData.get("title") || "",
      image: formData.get("image") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id, title, image } = data.data;

    const res = await updateCategory({
      id,
      title,
      image,
    });

    console.log("User updated successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in updateUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later."
  }
}

// Action to delete a user
export async function deleteCategoryAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف المستخدم مطلوب"), // "User ID is required"
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id } = data.data;

    const res = await deleteCategory(id);

    console.log("User deleted successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in deleteUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later."
  }
}
