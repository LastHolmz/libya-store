"use server";

import prisma from "@/prisma/db";
import { ColorShceme, Extension, Product, User } from "@prisma/client";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

const CreateProduct = async ({
  // barcode,
  categoryId,
  description,
  image,
  originalPrice,
  price,
  title,
}: Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "brandIDs" | "subCategoryIDs" | "barcode"
>) => {
  try {
    const product = await prisma.product.create({
      data: {
        // barcode,
        barcode: "1",
        image,
        price,
        title,
        categoryId,
        description,
        originalPrice,
      },
    });
    if (!product) {
      return { message: "فشل انشاء المستخدم" };
    }
    revalidateTag("products");
    return { message: "تم انشاء المستخدم بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل انشاء الحساب" };
  }
};

const deleteColor = async ({ id }: { id: string }) => {
  try {
    const color = await prisma.colorShceme.delete({
      where: { id },
    });
    if (!color) {
      return { message: "فشل حذف اللون" }; // "Failed to delete user"
    }
    revalidateTag("users");
    return { message: "تم حذف اللون بنجاح" }; // "User deleted successfully"
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل حذف اللون" }; // "Failed to delete account"
  }
};

const getProducts = unstable_cache(
  async ({ title, categoryId }: { title?: string; categoryId?: string }) => {
    try {
      const products = await prisma.product.findMany({
        where: {
          title: {
            contains: title,
          },
          categoryId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: {
            select: {
              id: true,
              title: true,
            },
          },
          brands: {
            select: {
              title: true,
              id: true,
            },
          },
          extensions: {
            select: {
              id: true,
              title: true,
              image: true,
              price: true,
              qty: true,
            },
          },
          colorShcemes: {
            select: {
              name: true,
              color: true,
              id: true,
              sizes: {
                select: {
                  id: true,
                  qty: true,
                  colorShcemeId: true,
                  title: true,
                },
              },
            },
          },
          subCategories: {
            select: {
              title: true,
              id: true,
            },
          },
        },
      });
      if (!products) {
        return [];
      }
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  ["products"],
  { tags: ["products"] }
);

const getProductById = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            title: true,
          },
        },
        brands: {
          select: {
            title: true,
            id: true,
          },
        },
        extensions: {
          select: {
            id: true,
            title: true,
            image: true,
            price: true,
            qty: true,
          },
        },
        colorShcemes: {
          select: {
            color: true,
            name: true,
            id: true,
            image: true,
            sizes: {
              select: {
                id: true,
                qty: true,
                colorShcemeId: true,
                title: true,
              },
            },
          },
        },
        subCategories: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });
    if (!product) {
      return undefined;
    }
    return product;
  } catch (error) {
    return undefined;
  }
};

const addColorToProduct = async ({
  color,
  image,
  name,
  productId,
  sizes,
}: Omit<ColorShceme, "id"> & {
  sizes: { title: string | null; qty: number }[];
}) => {
  try {
    const colorScheme = await prisma.colorShceme.create({
      data: {
        color,
        image,
        name,
        productId,
        sizes: {
          createMany: {
            data: sizes,
          },
        },
      },
    });
    if (!colorScheme) {
      return { message: "فشل انشاء اللون" };
    }
    revalidatePath("/");
    return { message: "تم انشاء اللون بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل انشاء اللون" };
  }
};
const updateColorOfProduct = async ({
  color,
  image,
  name,
  sizes,
  id,
}: ColorShceme & {
  sizes: { title: string | null; qty: number }[];
}) => {
  try {
    const colorScheme = await prisma.colorShceme.update({
      where: { id },
      data: {
        color,
        image,
        name,
        sizes: {
          deleteMany: {},
          createMany: {
            data: sizes,
          },
        },
      },
    });
    if (!colorScheme) {
      return { message: "فشل تحديث اللون" };
    }
    revalidatePath("/");
    return { message: "تم تحديث اللون بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل تحديث اللون" };
  }
};

const addExtensionToProduct = async ({
  image,
  productId,
  price,
  title,
  qty,
}: Omit<Extension, "id">) => {
  try {
    const extension = await prisma.extension.create({
      data: {
        price,
        image,
        productId,
        title,
        qty,
      },
    });
    if (!extension) {
      return { message: "فشل انشاء الإضافة" };
    }
    revalidatePath("/");
    return { message: "تم انشاء الإضافة بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل انشاء الإضافة" };
  }
};
const updateExtensionOfProduct = async ({
  image,
  productId,
  price,
  title,
  id,
  qty,
}: Extension) => {
  try {
    const extension = await prisma.extension.update({
      data: {
        price,
        image,
        productId,
        title,
        qty,
      },
      where: { id },
    });
    if (!extension) {
      return { message: "فشل تحديث الإضافة" };
    }
    revalidatePath("/");
    return { message: "تم تحديث الإضافة بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل تحديث الإضافة" };
  }
};
const deleteExtensionOfProduct = async ({ id }: { id: string }) => {
  try {
    const extension = await prisma.extension.delete({
      where: { id },
    });
    if (!extension) {
      return { message: "فشل حذف الإضافة" };
    }
    revalidatePath("/");
    return { message: "تم حذف الإضافة بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل حذف الإضافة" };
  }
};

export {
  CreateProduct,
  deleteColor,
  getProducts,
  getProductById,
  addColorToProduct,
  updateColorOfProduct,
  addExtensionToProduct,
  updateExtensionOfProduct,
  deleteExtensionOfProduct,
};
