"use server";

import prisma from "@/prisma/db";
import { Pixel } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

const getPixels = unstable_cache(
  async ({ title }: { title?: string }) => {
    try {
      const pixels = await prisma.pixel.findMany({
        where: {
          title: {
            contains: title,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return pixels || [];
    } catch (error) {
      return [];
    }
  },
  ["pixels"],
  { tags: ["pixels"] }
);

const getPixelById = async (id: string) => {
  try {
    const pixel = await prisma.pixel.findUnique({ where: { id } });
    return pixel ?? undefined;
  } catch (error) {
    return undefined;
  }
};

const createPixel = async ({
  title,
  value,
}: Omit<Pixel, "id" | "createdAt" | "updatedAt">): Promise<{
  message: string;
}> => {
  try {
    const pixel = await prisma.pixel.create({
      data: { title, value },
    });
    if (!pixel) return { message: "حدث خطأ أثناء إنشاء البكسل" };
    revalidateTag("pixels");
    return { message: "تم إنشاء البكسل بنجاح" };
  } catch (error) {
    return { message: "حدث خطأ أثناء إنشاء البكسل" };
  }
};

const updatePixel = async ({
  id,
  title,
  value,
}: Omit<Pixel, "createdAt" | "updatedAt">): Promise<{ message: string }> => {
  try {
    const pixel = await prisma.pixel.update({
      where: { id },
      data: { title, value },
    });
    if (!pixel) return { message: "حدث خطأ أثناء تحديث البكسل" };
    revalidateTag("pixels");
    return { message: "تم تحديث البكسل بنجاح" };
  } catch (error) {
    return { message: "حدث خطأ أثناء تحديث البكسل" };
  }
};

const deletePixel = async (id: string): Promise<{ message: string }> => {
  try {
    const pixel = await prisma.pixel.delete({ where: { id } });
    if (!pixel) return { message: "حدث خطأ أثناء حذف البكسل" };
    revalidateTag("pixels");
    return { message: "تم حذف البكسل بنجاح" };
  } catch (error) {
    return { message: "حدث خطأ أثناء حذف البكسل" };
  }
};

export { getPixels, getPixelById, createPixel, updatePixel, deletePixel };
