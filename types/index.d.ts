declare interface UserSession {
  id: string;
  fullName: string;
  role: "admin" | "superAdmin";
  email: string;
}

declare type nullable = null | undefined;

declare type variants =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

declare interface FieldOfActivity {
  icon: IconType;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
}

declare interface Lab {
  title: string;
  description: string;
  image: string;
  slug: string;
}

declare interface CartItem {
  productId: string; // ID of the product
  colorShcemeId: string; // ID of the selected color scheme
  sizeId: string; // ID of the selected size
  quantity: number; // Quantity of the item
  title: string; // Title of the product
  price: number; // Price of the product
  hexOfColor?: string; // Optional hex color code
  nameOfColor?: string; // Optional name of the color
  image: string; // URL of the product image
  sizeName: string;
  vanexId?: number | null;
}

declare interface PackageData {
  type: number; // Always set to 1
  description: string;
  qty: number; // How many pieces
  leangh: number; // Note: spelled as "leangh" in API docs, keep as-is if that's the actual API field
  width: number;
  height: number;
  breakable: number; // 1 if breakable
  measuring_is_allowed: boolean;
  inspection_allowed: boolean;
  heat_intolerance: boolean;
  casing: boolean;
  address: string;
  reciever: string;
  phone: number;
  phone_b: number;
  city: number; // City ID
  address_child: number; // Sub-city/child address ID
  price: number;
  sticker_notes: string; // Additional notes related to the package sticker
  paid_by: "market" | "customer";
  extra_size_by: "market" | "customer";
  commission_by: "market" | "customer";
  payment_method: "cash" | "cheque";
  map: string; // Google Maps URL
  package_sub_type: number; // Always 6
  type_id: number; // Always 1
  products: PackageProduct[]; // Array of products
}

declare interface PackageProduct {
  id: number;
  unit_price: number;
  qty: number;
}

declare type City = {
  id: number;
  name: string;
  name_en: string;
  code: string;
  price: number;
  branch: number;
  est_time: string;
  region: string;
  branch_region_details: {
    id: number;
    name: string;
  };
};

declare type SubCity = {
  id: number;
  name: string;
  name_en: string;
  code: string;
  region: string;
  price: number;
  est_time: string | null;
};

declare type DeliveryCalculation = {
  message: string;
  sender_region: string;
  destination: string;
  delivery_type: string;
  estimated_duration: string;
  destination_price: number;
  extra_size_price: number;
  est_days_int: number;
  commission_price: number;
  delivery_price: number;
};
