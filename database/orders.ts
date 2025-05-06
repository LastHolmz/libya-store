import { unstable_cache, revalidateTag } from "next/cache";
import type { CreateOrderInput, UpdateOrderInput } from "@/types/interfaces";
import prisma from "@/prisma/db";
import { generateUniqueBarcode } from "@/lib/barcode";
import { OrderStatus } from "@prisma/client";

export const getAllOrders = unstable_cache(
  async () => {
    try {
      const orders = await prisma.order.findMany({
        include: { orderItems: true },
        orderBy: { createdAt: "desc" },
      });
      return orders || [];
    } catch (error) {
      console.error("[GET_ALL_ORDERS]", error);
      return [];
    }
  },
  ["orders"],
  { tags: ["orders"] }
);

export const getOrderById = async (id: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });
    return order ?? undefined;
  } catch (error) {
    console.error("[GET_ORDER_BY_ID]", error);
    return undefined;
  }
};

export const createOrder = async ({
  data,
}: {
  data: CreateOrderInput;
}): Promise<{ message: string }> => {
  try {
    const barcode = await generateUniqueBarcode();
    await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          qty: data.qty,
          phone: data.phone,
          phoneB: data.phoneB,
          address: data.address,
          cityId: data.cityId,
          subCityId: data.subCityId,
          totalPrice: data.totalPrice,
          rest: data.rest,
          map: data.map,
          status: data.status,
          barcode,
          fullName: data.fullName,
          itemsPrice: data.itemsPrice,
          deliveryPrice: data.deliveryPrice,
        },
      });

      await tx.orderItem.createMany({
        data: data.items.map((item) => ({
          ...item,
          orderId: order.id,
        })),
      });
    });

    revalidateTag("orders");
    return { message: "تم إنشاء الطلب بنجاح." };
  } catch (error) {
    console.error("[CREATE_ORDER]", error);
    return { message: "فشل في إنشاء الطلب." };
  }
};

export const updateOrder = async ({
  data,
}: {
  data: UpdateOrderInput;
}): Promise<{ message: string }> => {
  try {
    const { id, items, ...orderData } = data;

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id },
        data: orderData,
      });

      if (items && items.length > 0) {
        await tx.orderItem.deleteMany({ where: { orderId: id } });
        await tx.orderItem.createMany({
          data: items.map((item) => ({
            ...item,
            orderId: id,
          })),
        });
      }
    });

    revalidateTag("orders");
    return { message: "تم تحديث الطلب بنجاح." };
  } catch (error) {
    console.error("[UPDATE_ORDER]", error);
    return { message: "فشل في تحديث الطلب." };
  }
};

export const deleteOrder = async (id: string): Promise<{ message: string }> => {
  try {
    await prisma.orderItem.deleteMany({ where: { orderId: id } });
    await prisma.order.delete({ where: { id } });

    revalidateTag("orders");
    return { message: "تم حذف الطلب بنجاح." };
  } catch (error) {
    console.error("[DELETE_ORDER]", error);
    return { message: "فشل في حذف الطلب." };
  }
};
