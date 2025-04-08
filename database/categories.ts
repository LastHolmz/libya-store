"use server";

import prisma from "@/prisma/db";
import { Category } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

const getCategories = unstable_cache(
  async ({ title }: { title?: string }) => {
    try {
      const categories = await prisma.category.findMany({
        include: {
          _count: true,
        },
        where: {
          title: {
            contains: title,
          },
        },
      });
      if (!categories) return [];
      return categories;
    } catch (error) {
      return [];
    }
  },
  ["categories"],
  { tags: ["categories"] }
);

const getCategoryById = async (id: string) => {
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) undefined;
    return category;
  } catch (error) {
    return undefined;
  }
};

const createCategory = async ({
  image,
  title,
  slug,
}: Omit<Category, "id" | "productIDs"> & {
  image?: string | null;
}): Promise<{ message: string }> => {
  try {
    const existedSlug = await prisma.category.findUnique({ where: { slug } });
    if (existedSlug) {
      return { message: "هذا المعرف الفريد موجود بالفعل" };
    }
    const category = await prisma.category.create({
      data: {
        title,
        image,
        slug,
      },
    });
    if (!category) return { message: "حدث خطأ أثناء إنشاء الصنف" };
    revalidateTag("categories");
    return { message: "تم إنشاء الصنف بنجاح" };
  } catch (error) {
    return {
      message: "حدث خطأ أثناء إنشاء الصنف",
    };
  }
};
const updateCategory = async ({
  image,
  title,
  id,
  slug,
}: Omit<Category, "productIDs"> & {
  image?: string | null;
}): Promise<{ message: string }> => {
  try {
    const category = await prisma.category.update({
      data: {
        title,
        image,
        slug,
      },
      where: {
        id,
      },
    });
    if (!category) return { message: "حدث خطأ أثناء تحديث الصنف" };
    revalidateTag("categories");
    return { message: "تم تحديث الصنف بنجاح" };
  } catch (error) {
    return {
      message: "حدث خطأ أثناء تحديث الصنف",
    };
  }
};
const deleteCategory = async (id: string): Promise<{ message: string }> => {
  try {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
    if (!category) return { message: "حدث خطأ أثناء حذف الصنف" };
    revalidateTag("categories");
    return { message: "تم حذف الصنف بنجاح" };
  } catch (error) {
    return {
      message: "حدث خطأ أثناء حذف الصنف",
    };
  }
};

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
