"use server";

import prisma from "@/prisma/db";
import {
  ColorShceme,
  Extension,
  Product,
  SelectType,
  User,
} from "@prisma/client";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { inspect } from "util";
import { boolean } from "zod";

const CreateProduct = async ({
  // barcode,
  categoryId,
  description,
  image,
  originalPrice,
  price,
  title,
}: {
  categoryId: string;
  description: string | null;
  image: string;
  originalPrice: number | null;
  price: number;
  title: string;
}) => {
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
          reviews: {
            select: {
              rating: true,
            },
          },
          _count: true,
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
            vanexId: true,
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
        reviews: {
          select: {
            rating: true,
          },
        },
        _count: true,
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
  vanexId,
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
        vanexId,
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
  vanexId,
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
        vanexId,
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

const addDescriptionToProduct = async ({
  id,
  info,
}: {
  info: string;
  id: string;
}): Promise<{ message: string }> => {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: { info },
    });
    if (!product) {
      return { message: "فشل تحديث شرح المنتج" };
    }
    return { message: "تم تحديث شرح المنتج" };
  } catch (error) {
    return { message: "فشل تحديث شرح المنتج" };
  }
};

const updateConfigOfProduct = async ({
  acceptReviews,
  fakeRatingSelected,
  selectType,
  fakeRating,
  fakeDiscountRation,
  id,
}: {
  selectType: SelectType;
  acceptReviews: boolean;
  id: string;
  fakeRatingSelected: boolean;
  fakeRating?: number | null;
  fakeDiscountRation?: number | null;
}) => {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        acceptReviews,
        fakeRatingSelected,
        selectType,
        fakeRating: fakeRating && fakeRating > 5 ? 5 : fakeRating,
        fakeDiscountRation: fakeDiscountRation,
      },
    });
    if (!product) {
      return { message: "فشل تحديث اعدادات المنتج" };
    }
    revalidatePath("/");
    return { message: "تم تحديث اعدادات المنتج" };
  } catch (error) {
    console.error(
      "Error updating product config:",
      inspect(error, { depth: null })
    );
    return { message: "فشل تحديث اعدادات المنتج" };
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
  addDescriptionToProduct,
  updateConfigOfProduct,
};
