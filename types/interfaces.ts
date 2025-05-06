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
  itemsPrice: number;
  deliveryPrice: number;
  rest: number;
  map?: string;
  status: OrderStatus;
  items: OrderItemInput[];
};

export type UpdateOrderInput = Partial<CreateOrderInput> & {
  id: string;
  notes?: string | null;
  status: OrderStatus;
};

export type { CategoriesProps };

export interface OrdersProps extends Order {
  orderItems: OrderItem[];
}

export interface CreateVanexOrderInput {
  // type: number; // Always set the type to 1
  description: string;
  qty: number;
  leangh: number;
  width: number;
  height: number;
  breakable: 0 | 1; // Is the package breakable (true only if value = 1)
  measuring_is_allowed: boolean; // measuring is allowed for the package
  inspection_allowed: boolean; // A flag indicating whether inspection is allowed for the package
  heat_intolerance: boolean; // A flag indicating whether the package has heat intolerance
  casing: boolean; // A flag indicating whether the package requires casing
  address: string;
  reciever: string;
  phone: number;
  phone_b: number;
  city: number;
  address_child: number; // The ID of the child address (sub-city) in the database
  price: number;
  sticker_notes: string; // Additional notes related to the package sticker
  paid_by: "market" | "customer";
  extra_size_by: "market" | "customer";
  commission_by: "market" | "customer"; // ndicates who will handle the commission for the package. can only be (market or customer)
  payment_method: "cash" | "cheque";
  map: string;
  // package_sub_type: number; // Always set the package_sub_type to 6
  // type_id: number; // Always set the type_id to 1
  products?: { id: number; unit_price: number; qty: number }[];
}

export type PackageStatus =
  | "store-new"
  | "on-track"
  | "cant-delivery"
  | "return"
  | "store-return"
  | null;

export interface PackageQueryParams {
  page?: number;
  perPage?: number;
  status?: PackageStatus;
}

export interface VanexPackage {
  package_code: string;
  reciever: string;
  phone: string;
  phone_b: string;
  address: string;
  price: number;
  total: number;
  status: string;
  description: string;
  map: string;
  qty: number;
  city: {
    id: number;
    name: string;
  };
  sub_city: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface GetPackagesResponse {
  status_code: number;
  message: string;
  data: {
    data: VanexPackage[];
    links: Record<string, string | null>;
    meta: {
      current_page: number;
      total: number;
      per_page: number;
      last_page: number;
    };
  };
  errors: boolean;
}

export interface CreatePackageResponse {
  status_code: number;
  message: string;
  package_code: string;
  errors: boolean;
}
