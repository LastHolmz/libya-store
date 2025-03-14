import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoriesProps extends Category {
  _count: { Product: number };
}

const Categories = ({ categories }: { categories: CategoriesProps[] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-4 md:gap-6">
      {categories.map((category, i) => (
        <CategoryCard key={i} {...category} />
      ))}
    </div>
  );
};

export const CategoryCard = ({
  id,
  image,
  title,
  slug,
  _count,
}: CategoriesProps) => {
  return (
    <Link
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-md"
      href={`/categories/${id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent"></div>
        <Image
          alt={`صورة ${title}`}
          src={image}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="100vw"
        />
      </div>
      <div className="relative z-20 -mt-3 p-4">
        <div className="mb-1 text-lg font-medium">{title}</div>
        <p className="text-sm text-muted-foreground">{_count.Product} منتجات</p>
      </div>
    </Link>
  );
};

export default Categories;
