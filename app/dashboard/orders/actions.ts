"use server";

import { z } from "zod";
import { createOrder, updateOrder, deleteOrder } from "@/database/orders";
import { OrderStatus } from "@prisma/client";

// Create Order
// export async function createOrderAction(
//   _: { message: string },
//   formData: FormData
// ): Promise<{ message: string }> {
//   try {
//     const schema = z.object({
//       qty: z.coerce.number(),
//       phone: z.string().min(1),
//       phoneB: z.string().optional().nullable(),
//       address: z.string().min(1),
//       cityId: z.coerce.number(),
//       subCityId: z.coerce.number(),
//       totalPrice: z.coerce.number(),
//       rest: z.coerce.number(),
//       map: z.string().optional().nullable(),
//       status: z.nativeEnum(OrderStatus),
//       barcode: z.string().min(1),
//       items: z.string(), // JSON stringified array of OrderItemInput[]
//     });

//     const parsed = schema.safeParse({
//       qty: formData.get("qty"),
//       phone: formData.get("phone"),
//       phoneB: formData.get("phoneB"),
//       address: formData.get("address"),
//       cityId: formData.get("cityId"),
//       subCityId: formData.get("subCityId"),
//       totalPrice: formData.get("totalPrice"),
//       rest: formData.get("rest"),
//       map: formData.get("map"),
//       status: formData.get("status"),
//       barcode: formData.get("barcode"),
//       items: formData.get("items"),
//     });

//     if (!parsed.success) {
//       return {
//         message: parsed.error.errors.map((e) => e.message).join(", "),
//       };
//     }

//     const values = parsed.data;
//     const items = JSON.parse(values.items); // Validate structure in frontend before submitting

//     const res = await createOrder({
//       ...values,
//       phoneB: values.phoneB ?? undefined,
//       map: values.map ?? undefined,
//       items,
//     });
//     return { message: res.message };
//   } catch (error) {
//     console.error("[CREATE_ORDER_ACTION]", error);
//     return { message: "Operation failed, please try again later." };
//   }
// }

// Update Order
export async function updateOrderAction(
  _: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const schema = z.object({
      id: z.string().min(1),
      qty: z.coerce.number().optional(),
      phone: z.string().optional(),
      phoneB: z.string().optional().nullable(),
      address: z.string().optional(),
      cityId: z.coerce.number().optional(),
      subCityId: z.coerce.number().optional(),
      totalPrice: z.coerce.number().optional(),
      rest: z.coerce.number().optional(),
      map: z.string().optional().nullable(),
      status: z.nativeEnum(OrderStatus).optional(),
      barcode: z.string().optional(),
      items: z.string().optional(), // JSON stringified
    });

    const parsed = schema.safeParse({
      id: formData.get("id"),
      qty: formData.get("qty"),
      phone: formData.get("phone"),
      phoneB: formData.get("phoneB"),
      address: formData.get("address"),
      cityId: formData.get("cityId"),
      subCityId: formData.get("subCityId"),
      totalPrice: formData.get("totalPrice"),
      rest: formData.get("rest"),
      map: formData.get("map"),
      status: formData.get("status"),
      barcode: formData.get("barcode"),
      items: formData.get("items"),
    });

    if (!parsed.success) {
      return {
        message: parsed.error.errors.map((e) => e.message).join(", "),
      };
    }

    const values = parsed.data;
    const items = values.items ? JSON.parse(values.items) : undefined;

    const res = await updateOrder({
      ...values,
      phoneB: values.phoneB ?? undefined,
      map: values.map ?? undefined,
      items,
    });
    return { message: res.message };
  } catch (error) {
    console.error("[UPDATE_ORDER_ACTION]", error);
    return { message: "Operation failed, please try again later." };
  }
}

// Delete Order
export async function deleteOrderAction(
  _: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const schema = z.object({
      id: z.string().min(1, "Order ID is required"),
    });

    const parsed = schema.safeParse({
      id: formData.get("id"),
    });

    if (!parsed.success) {
      return {
        message: parsed.error.errors.map((e) => e.message).join(", "),
      };
    }

    const res = await deleteOrder(parsed.data.id);
    return { message: res.message };
  } catch (error) {
    console.error("[DELETE_ORDER_ACTION]", error);
    return { message: "Operation failed, please try again later." };
  }
}
