import Image from "next/image";
import React from "react";
import { CustomLink } from "../custom-link";
import { CategoriesProps } from "@/types/interfaces";
import { CategoryCard } from "@/app/(interface)/components/categories";

const ShopByCategory = ({ categories }: { categories: CategoriesProps[] }) => {
  return (
    <section className="py-12 md:py-16 md:container mx-auto">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            تسوق حسب الفئة
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary"></div>
          <p className="mt-4 max-w-2xl text-center text-muted-foreground">
            اعثر على الجهاز المثالي لاحتياجاتك من مجموعاتنا المختارة بعناية
          </p>
        </div>
        <div className="flex justify-start phone-only:justify-center flex-wrap gap-2 md:gap-6">
          {categories.map((category, i) => (
            <CategoryCard key={i} {...category} />
          ))}
        </div>
        <CustomLink
          href="/categories"
          className="mx-auto w-fit text-center block mt-4 text-xl"
        >
          كل الأصناف
        </CustomLink>
      </div>
    </section>
  );
};

export default ShopByCategory;
