import { Category } from "@prisma/client";

interface CategoriesProps extends Category {
  _count: { Product: number };
}

export type { CategoriesProps };
