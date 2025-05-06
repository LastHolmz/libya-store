"use server";

import { z } from "zod";
import { updateOrder, deleteOrder } from "@/database/orders";
import { OrderStatus } from "@prisma/client";
import { createOrder } from "@/database/orders";
import { OrderItemInput } from "@/types/interfaces";
import { createPackage } from "@/database/packages";

// Define the validation schema using Zod
const checkoutSchema = z.object({
  id: z.string().min(1, {
    message: "معرف الطلب مطلوب",
  }),
  fullName: z.string().min(1, "الاسم مطلوب"),
  phone: z.string().min(5, "رقم الهاتف مطلوب"),
  phone_b: z.string().optional(),
  address: z.string().min(1, "العنوان مطلوب"),
  map: z.string().optional(),
  quantity: z.coerce.number().min(1, "الكمية يجب أن تكون رقمًا موجبًا"),
  cityId: z.coerce.number().min(1, "المدينة مطلوبة"),
  subCityId: z.coerce.number().optional(),
  notes: z.string().optional(),
  status: z.nativeEnum(OrderStatus, {
    message: "الحالة مطلوبة",
  }),
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
      nameOfSize: z.string().optional(),
    })
  ),
  totalPrice: z.coerce.number().min(1, "السعر الإجمالي مطلوب"),
  itemsPrice: z.coerce.number().min(1, "إجمالي سعر المنتجات مطلوب"),
  deliveryPrice: z.coerce.number().min(1, "سعر التوصيل مطلوب"),
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
      itemsPrice: Number(formData.get("itemsPrice")),
      deliveryPrice: Number(formData.get("deliveryPrice")),
    });

    // const parsed = checkoutSchema.safeParse(data);

    if (!data.success) {
      console.log(data.error.errors);
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
      cityId,
      subCityId,
      items,
      totalPrice,
      deliveryPrice,
      itemsPrice,
      // quantity,
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
        deliveryPrice,
        itemsPrice,
      },
    });

    return { message: res.message };
  } catch (error) {
    console.error("Error creating order:", error);
    return { message: "خطأ أثناء إرسال الطلب" };
  }
}

// Update Order
export async function updateOrderAction(
  _: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const parsed = checkoutSchema.safeParse({
      id: formData.get("id"),
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
      itemsPrice: Number(formData.get("itemsPrice")),
      deliveryPrice: Number(formData.get("deliveryPrice")),
      notes: formData.get("notes"),
    });

    if (!parsed.success) {
      console.log(parsed.error.errors);
      return {
        message: parsed.error.errors.map((e) => e.message).join(", "),
      };
    }
    const {
      fullName,
      phone,
      phone_b,
      address,
      map,
      cityId,
      subCityId,
      items,
      totalPrice,
      deliveryPrice,
      itemsPrice,
      id,
      notes,
      status,
    } = parsed.data;

    const res = await updateOrder({
      data: {
        address,
        fullName,
        cityId,
        phone,
        items: items as OrderItemInput[],
        qty: items.reduce((acc: number, item: any) => acc + item.qty, 0),
        rest: totalPrice,
        status,
        subCityId: subCityId ?? null,
        totalPrice,
        map,
        phoneB: phone_b,
        deliveryPrice,
        itemsPrice,
        id,
        notes,
      },
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

// Zod schema for validating form data
const packageSchema = z.object({
  // type: z.coerce.number(),
  description: z.string().min(1, "الوصف مطلوب"),
  qty: z.coerce.number().min(1, "الكمية مطلوبة"),
  leangh: z.coerce.number().min(1, "الطول مطلوب"),
  width: z.coerce.number().min(1, "العرض مطلوب"),
  height: z.coerce.number().min(1, "الارتفاع مطلوب"),
  // breakable: z.coerce.number().refine((val) => val === 0 || val === 1, {
  //   message: "يجب أن يكون 0 أو 1",
  // }),
  breakable: z.coerce.boolean(),
  measuring_is_allowed: z.coerce.boolean(),
  inspection_allowed: z.coerce.boolean(),
  heat_intolerance: z.coerce.boolean(),
  casing: z.coerce.boolean(),
  address: z.string().min(1, "العنوان مطلوب"),
  reciever: z.string().min(1, "المستلم مطلوب"),
  phone: z.coerce.number().min(1, "رقم الهاتف مطلوب"),
  phone_b: z.coerce.number().min(1, "الرقم البديل مطلوب"),
  city: z.coerce.number().min(1, "المدينة مطلوبة"),
  address_child: z.coerce.number().min(1, "الفرع مطلوب")?.optional(),
  price: z.coerce.number().min(1, "السعر مطلوب"),
  sticker_notes: z.string().optional(),
  paid_by: z.enum(["market", "customer"]),
  extra_size_by: z.enum(["market", "customer"]),
  commission_by: z.enum(["market", "customer"]),
  payment_method: z.enum(["cash", "cheque"]),
  map: z.string().optional().nullable(),
  // package_sub_type: z.literal(6),
  // type_id: z.literal(1),
  products: z
    .string()
    .transform((val) => JSON.parse(val))
    .refine(
      (products) =>
        Array.isArray(products) &&
        products.every(
          (p) =>
            typeof p.id === "number" &&
            typeof p.unit_price === "number" &&
            typeof p.qty === "number"
        ),
      {
        message: "منتجات غير صالحة",
        path: ["products"],
      }
    ),
  orderId: z.string().min(1, {
    message: `يجب توفير ايدي الطلب`,
  }),
});

export async function createPackageAction(
  _: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const result = packageSchema.safeParse({
      // type: formData.get("type"),
      description: formData.get("description"),
      qty: formData.get("qty"),
      leangh: formData.get("leangh"),
      width: formData.get("width"),
      height: formData.get("height"),
      breakable: formData.get("breakable"),
      measuring_is_allowed: formData.get("measuring_is_allowed"),
      inspection_allowed: formData.get("inspection_allowed"),
      heat_intolerance: formData.get("heat_intolerance"),
      casing: formData.get("casing"),
      address: formData.get("address"),
      reciever: formData.get("reciever"),
      phone: formData.get("phone"),
      phone_b: formData.get("phone_b"),
      city: formData.get("city"),
      address_child: formData.get("address_child"),
      price: formData.get("price"),
      sticker_notes: formData.get("sticker_notes") ?? undefined,
      paid_by: formData.get("paid_by"),
      extra_size_by: formData.get("extra_size_by"),
      commission_by: formData.get("commission_by"),
      payment_method: formData.get("payment_method"),
      map: formData.get("map") ?? "",
      // package_sub_type: formData.get("package_sub_type"),
      // type_id: formData.get("type_id"),
      products: formData.get("products"),
      orderId: formData.get("orderId"),
    });
    // console.log(result);
    if (!result.success) {
      console.log(result.error.errors);
      const message = result.error.errors.map((e) => e.message).join(", ");
      return { message };
    }

    const data = result.data;
    const products: PackageProduct[] = data.products;

    const { orderId, ...restData } = data;
    console.log(data);

    // const res = await createPackage({
    //   data: {
    //     ...restData,
    //     products: products,
    //     type: 1,
    //     type_id: 1,
    //     package_sub_type: 6,
    //     map: data?.map ?? "",
    //     payment_methode: data.payment_method,
    //     phone: Number(`218${data.phone}`),
    //     phone_b: Number(`218${data.phone_b}`),
    //     breakable: data.breakable ? 1 : 0,
    //   },
    //   orderId: data.orderId,
    // });
    return { message: "res.message" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
}
