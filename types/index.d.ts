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
