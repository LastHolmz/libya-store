"use server";

import { z } from "zod";
import {
  CreateReview,
  updateReview,
  deleteReview,
  getReviews,
  getReviewById,
} from "@/database/reviews";

export async function createReviewAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      fullName: z.string().min(2, "الاسم الكامل مطلوب"),
      rating: z.number().min(1).max(5, "التقييم يجب أن يكون بين 1 و 5"),
      comment: z.string().min(10, "التعليق يجب أن يكون 10 أحرف على الأقل"),
      productId: z.string().min(1, "معرف المنتج مطلوب"),
      // accepted: z.string().optional(),
    });

    const data = schema.safeParse({
      fullName: formData.get("fullName") || "",
      rating: Number(formData.get("rating")) || 0,
      comment: formData.get("comment") || "",
      productId: formData.get("productId") || "",
      // accepted: formData.get("accepted") || "false",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { fullName, rating, comment, productId } = data.data;

    const res = await CreateReview({
      fullName,
      rating,
      comment,
      productId,
      accepted: false,
    });

    console.log("Review created successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in createReviewAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}

export async function updateReviewAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف التقييم مطلوب"),
      fullName: z.string().min(2, "الاسم الكامل مطلوب"),
      rating: z.number().min(1).max(5, "التقييم يجب أن يكون بين 1 و 5"),
      comment: z.string().min(10, "التعليق يجب أن يكون 10 أحرف على الأقل"),
      accepted: z.string(),
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
      fullName: formData.get("fullName") || "",
      rating: Number(formData.get("rating")) || 0,
      comment: formData.get("comment") || "",
      accepted: formData.get("accepted") || "false",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id, fullName, rating, comment, accepted } = data.data;

    const res = await updateReview({
      id,
      fullName,
      rating,
      comment,
      accepted: accepted === "true",
    });

    console.log("Review updated successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in updateReviewAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}

export async function deleteReviewAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف التقييم مطلوب"),
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

    const res = await deleteReview({ id });

    console.log("Review deleted successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in deleteReviewAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}

// export async function getReviewsAction(comment?: string) {
//   try {
//     const reviews = await getReviews({ comment });
//     return reviews;
//   } catch (error) {
//     console.error("Error in getReviewsAction:", error);
//     return [];
//   }
// }

// export async function getReviewByIdAction(id: string) {
//   try {
//     const review = await getReviewById(id);
//     return review;
//   } catch (error) {
//     console.error("Error in getReviewByIdAction:", error);
//     return undefined;
//   }
// }
