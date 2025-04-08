import { CategoriesProps } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Categories = ({ categories }: { categories: CategoriesProps[] }) => {
  return (
    <div className="flex justify-start phone-only:justify-center flex-wrap gap-2 md:gap-6">
      {categories.map((category, i) => (
        <CategoryCard key={i} {...category} />
      ))}
    </div>
  );
};

export const CategoryCard = ({ id, image, title }: CategoriesProps) => {
  return (
    <div>
      <Link className="block group w-full h-full" href={`/categories/${id}`}>
        <div className="h-24 w-24 md:w-36 md:h-36 relative overflow-hidden rounded-lg bg-secondary">
          <div className="bg-black/50 absolute group-hover:w-full group-hover:h-full z-50 h-0 top-0 transition duration-300 left-0 w-0"></div>
          <Image
            alt={`صورة-${title}`}
            src={image}
            width={400}
            height={400}
            className="object-contain w-full h-full transition duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="text-center mt-2 transition duration-300 group-hover:text-foreground font-normal text-sm text-foreground/80">
          {title}
        </h3>
      </Link>
    </div>
  );
};

export default Categories;

/* 

  <Image
          alt={`صورة-${title}`}
          src={image}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="100vw"
        />

*/
