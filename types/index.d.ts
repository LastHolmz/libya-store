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
}
