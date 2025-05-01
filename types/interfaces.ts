import { Category } from "@prisma/client";
import type { Order, OrderItem, OrderStatus } from "@prisma/client";

interface CategoriesProps extends Category {
  _count: { Product: number };
}

// types.ts
export type OrderItemInput = Omit<
  OrderItem,
  "id" | "orderId" | "updatedAt" | "createdAt"
>;

export type CreateOrderInput = {
  fullName: string;
  qty: number;
  phone: string;
  phoneB?: string;
  address: string;
  cityId: number;
  subCityId: number | null;
  totalPrice: number;
  rest: number;
  map?: string;
  status: OrderStatus;
  items: OrderItemInput[];
};

export type UpdateOrderInput = Partial<CreateOrderInput> & { id: string };

export type { CategoriesProps };

export interface OrdersProps extends Order {
  orderItems: OrderItem[];
}
