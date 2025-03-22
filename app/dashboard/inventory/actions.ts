import { z } from "zod";
import {
  CreateProduct,
  addColorToProduct,
  addExtensionToProduct,
  deleteColor,
  deleteExtensionOfProduct,
  updateColorOfProduct,
  updateExtensionOfProduct,
} from "@/database/products";

export async function createProductAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      title: z.string().min(4, "الاسم الكامل مطلوب"),
      price: z.string(),
      originalPrice: z.string(),
      image: z.string(),
      description: z.string(),
      categoryId: z.string(),
    });

    const data = schema.safeParse({
      title: formData.get("title") || "",
      price: formData.get("price") || "",
      originalPrice: formData.get("originalPrice") || "",
      image: formData.get("image") || "",
      description: formData.get("description") || "",
      categoryId: formData.get("categoryId") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { title, categoryId, description, price, originalPrice, image } =
      data.data;

    const res = await CreateProduct({
      title,
      categoryId,
      description,
      price: Number(price),
      image,
      originalPrice: Number(originalPrice),
      info: "",
    });

    console.log("User created successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in createUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}

export async function addColorToProductAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      name: z.string().min(1, "اسم اللون مطلوب"),
      color: z.string().min(1, "يجب تحديد اللون"),
      image: z.string().optional(),
      productId: z.string(),
      sizes: z.array(
        z.object({
          title: z.string().nullable(),
          qty: z.number(),
        })
      ),
    });

    const data = schema.safeParse({
      name: formData.get("name") || "",
      color: formData.get("color") || "",
      image: formData.get("image") || "",
      productId: formData.get("productId") || "",
      sizes: JSON.parse((formData.get("sizes") as string) || "[]"),
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { name, color, image, productId, sizes } = data.data;

    const result = await addColorToProduct({
      name,
      color,
      image: image ?? null,
      productId,
      sizes,
    });

    return { message: result.message };
  } catch (error) {
    console.error("Error in addColorToProductAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}
export async function updateColorOfProductAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
      name: z.string().min(1, "اسم اللون مطلوب"),
      color: z.string().min(1, "يجب تحديد اللون"),
      image: z.string().optional(),
      productId: z.string(),
      sizes: z.array(
        z.object({
          title: z.string().nullable(),
          qty: z.number(),
        })
      ),
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
      name: formData.get("name") || "",
      color: formData.get("color") || "",
      image: formData.get("image") || "",
      productId: formData.get("productId") || "",
      sizes: JSON.parse((formData.get("sizes") as string) || "[]"),
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { name, color, image, productId, sizes, id } = data.data;

    const result = await updateColorOfProduct({
      name,
      color,
      image: image ?? null,
      productId,
      sizes,
      id,
    });

    return { message: result.message };
  } catch (error) {
    console.error("Error in addColorToProductAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}
export async function deleteColorOfProductAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
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

    const result = await deleteColor({
      id,
    });

    return { message: result.message };
  } catch (error) {
    console.error("Error in addColorToProductAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}
export async function addExtensionToProductAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      title: z.string().min(1, "اسم الإضافة مطلوب"),
      price: z.string(),
      qty: z.string(),
      image: z.string().optional(),
      productId: z.string(),
    });

    const data = schema.safeParse({
      title: formData.get("title") || "",
      price: formData.get("price") || "",
      qty: formData.get("qty") || "",
      image: formData.get("image") || "",
      productId: formData.get("productId") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { title, image, productId, price, qty } = data.data;

    const result = await addExtensionToProduct({
      title,
      price: Number(price),
      qty: Number(qty),
      image: image ?? null,
      productId,
    });

    return { message: result.message };
  } catch (error) {
    console.error("Error in addColorToProductAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}
export async function updateExtensionOfProductAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
      title: z.string().min(1, "اسم الإضافة مطلوب"),
      price: z.string(),
      qty: z.string(),
      image: z.string().optional(),
      productId: z.string(),
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
      title: formData.get("title") || "",
      qty: formData.get("qty") || "",
      price: formData.get("price") || "",
      image: formData.get("image") || "",
      productId: formData.get("productId") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { image, productId, id, price, title, qty } = data.data;

    const result = await updateExtensionOfProduct({
      image: image ?? null,
      productId,
      id,
      price: Number(price),
      qty: Number(qty),
      title,
    });

    return { message: result.message };
  } catch (error) {
    console.error("Error in addColorToProductAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}
export async function deleteExtensionOfProductAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
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

    const result = await deleteExtensionOfProduct({
      id,
    });

    return { message: result.message };
  } catch (error) {
    console.error("Error in addColorToProductAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}
