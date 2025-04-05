"use server";

import prisma from "@/prisma/db";
import { Review } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

const CreateReview = async ({
  accepted,
  comment,
  rating,
  fullName,
  productId,
}: Omit<Review, "id" | "createdAt" | "updatedAt">) => {
  try {
    const review = await prisma.review.create({
      data: {
        fullName,
        rating,
        accepted,
        comment,
        productId,
      },
    });
    if (!review) {
      return { message: "فشل التقييم" };
    }
    revalidateTag("products");
    return { message: "تم التقييم بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل التقييم" };
  }
};

const updateReview = async ({
  id,
  accepted,
  comment,
  rating,
  fullName,
}: Pick<Review, "id" | "accepted" | "comment" | "rating" | "fullName">) => {
  try {
    const review = await prisma.review.update({
      where: { id },
      data: {
        fullName,
        rating,
        accepted,
        comment,
      },
    });
    if (!review) {
      return { message: "فشل تحديث التقييم" };
    }
    revalidateTag("reviews");
    revalidateTag("products");
    return { message: "تم تحديث التقييم بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل تحديث التقييم" };
  }
};

const deleteReview = async ({ id }: { id: string }) => {
  try {
    const review = await prisma.review.delete({
      where: { id },
    });
    if (!review) {
      return { message: "فشل حذف التقييم" };
    }
    revalidateTag("reviews");
    return { message: "تم حذف التقييم بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل حذف التقييم" };
  }
};

const getReviews = unstable_cache(
  async ({ comment }: { comment?: string }) => {
    try {
      const reviews = await prisma.review.findMany({
        where: {
          comment: {
            contains: comment,
          },
        },
        orderBy: {
          rating: "desc",
        },
      });
      if (!reviews) {
        return [];
      }
      return reviews;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  ["reviews"],
  { tags: ["reviews"] }
);

const getReviewById = async (id: string) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id },
    });
    if (!review) {
      return undefined;
    }
    return review;
  } catch (error) {
    return undefined;
  }
};

export { CreateReview, updateReview, deleteReview, getReviews, getReviewById };
