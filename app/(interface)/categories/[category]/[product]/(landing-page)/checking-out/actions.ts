"use server";

import { z } from "zod";
import { createOrder } from "@/database/orders";
import { OrderItemInput } from "@/types/interfaces";

// Define the validation schema using Zod
const checkoutSchema = z.object({
  fullName: z.string().min(1, "الاسم مطلوب"),
  phone: z.string().min(5, "رقم الهاتف مطلوب"),
  phone_b: z.string().optional(),
  address: z.string().min(1, "العنوان مطلوب"),
  map: z.string().optional(),
  quantity: z.coerce.number().min(1, "الكمية يجب أن تكون رقمًا موجبًا"),
  cityId: z.coerce.number().min(1, "المدينة مطلوبة"),
  subCityId: z.coerce.number().optional(),
  /* 
 items: { productId: string;
    qty: number;
    title: string;
    price: number;
    image: string;
    vanexId: number | null;
    skuId: string;
    skuImage: string | null;
    hashedColor: string | null;
    nameOfColor: string | null; }[]
  */
  items: z.array(
    z.object({
      productId: z.string().min(1, "معرف المنتج مطلوب"),
      qty: z.coerce.number().min(1, "الكمية يجب أن تكون رقمًا موجبًا"),
      title: z.string().min(1, "اسم المنتج مطلوب"),
      price: z.coerce.number().min(1, "سعر المنتج مطلوب"),
      image: z.string().min(1, "صورة المنتج مطلوبة"),
      vanexId: z.coerce.number().optional().nullable(),
      skuId: z.string().optional(),
      skuImage: z.string().optional(),
      hashedColor: z.string().optional(),
      nameOfColor: z.string().optional(),
    })
  ),
  totalPrice: z.coerce.number().min(1, "السعر الإجمالي مطلوب"),
});

export async function submitOrderAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const data = checkoutSchema.safeParse({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      phone_b: formData.get("phone_b"),
      address: formData.get("address"),
      map: formData.get("map"),
      quantity: Number(formData.get("qty")),
      cityId: Number(formData.get("city")),
      subCityId: Number(formData.get("subCity")),
      items: JSON.parse(formData.get("items") as string),
      totalPrice: Number(formData.get("totalPrice")),
    });

    // const parsed = checkoutSchema.safeParse(data);

    if (!data.success) {
      // console.log(data.error.errors)
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const {
      fullName,
      phone,
      phone_b,
      address,
      map,
      // quantity,
      cityId,
      subCityId,
      items,
      totalPrice,
    } = data.data;

    const res = await createOrder({
      data: {
        address,
        fullName,
        cityId,
        phone,
        items: items as OrderItemInput[],
        qty: items.reduce((acc: number, item: any) => acc + item.qty, 0),
        rest: totalPrice,
        status: "pending",
        subCityId: subCityId ?? null,
        totalPrice,
        map,
        phoneB: phone_b,
      },
    });

    return { message: res.message };
  } catch (error) {
    console.error("Error creating order:", error);
    return { message: "خطأ أثناء إرسال الطلب" };
  }
}
