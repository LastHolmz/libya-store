import Image from "next/image";
import React from "react";
import { CustomLink } from "../custom-link";

const ShopByCategory: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
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
        <div className="grid gap-4 md:grid-cols-4 md:gap-6">
          {/* فئة الصوتيات */}
          <a
            className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-md"
            href="/products?category=audio"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent"></div>
              <Image
                alt="الصوتيات"
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="100vw"
              />
            </div>
            <div className="relative z-20 -mt-3 p-4">
              <div className="mb-1 text-lg font-medium">الصوتيات</div>
              <p className="text-sm text-muted-foreground">12 منتج</p>
            </div>
          </a>

          {/* فئة الأجهزة القابلة للارتداء */}
          <a
            className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-md"
            href="/products?category=wearables"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent"></div>
              <Image
                alt="الأجهزة القابلة للارتداء"
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="100vw"
              />
            </div>
            <div className="relative z-20 -mt-3 p-4">
              <div className="mb-1 text-lg font-medium">
                الأجهزة القابلة للارتداء
              </div>
              <p className="text-sm text-muted-foreground">8 منتجات</p>
            </div>
          </a>

          {/* فئة الهواتف الذكية */}
          <a
            className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-md"
            href="/products?category=smartphones"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent"></div>
              <Image
                alt="الهواتف الذكية"
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="100vw"
              />
            </div>
            <div className="relative z-20 -mt-3 p-4">
              <div className="mb-1 text-lg font-medium">الهواتف الذكية</div>
              <p className="text-sm text-muted-foreground">15 منتج</p>
            </div>
          </a>

          {/* فئة الحواسيب المحمولة */}
          <a
            className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-md"
            href="/products?category=laptops"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent"></div>
              <Image
                alt="الحواسيب المحمولة"
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="100vw"
              />
            </div>
            <div className="relative z-20 -mt-3 p-4">
              <div className="mb-1 text-lg font-medium">الحواسيب المحمولة</div>
              <p className="text-sm text-muted-foreground">10 منتجات</p>
            </div>
          </a>
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
