import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CustomLink } from "../custom-link";

const FeaturedProducts: React.FC = () => {
  return (
    <section className="bg-muted/50 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            المنتجات المميزة
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary"></div>
          <p className="mt-4 max-w-2xl text-center text-muted-foreground">
            اطّلع على أحدث وأشهر منتجاتنا التقنية
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* المنتج 1 */}
          <div className="group">
            <div className="bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm relative h-full overflow-hidden rounded-lg transition-all duration-200 ease-in-out hover:shadow-md">
              <div className="relative aspect-square -mt-6 overflow-hidden rounded-t-lg">
                <Link
                  href={"#"}
                  className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent"
                ></Link>
                <Image
                  alt="سماعات لاسلكية فاخرة"
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <CustomLink
                  href={"#"}
                  className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground absolute left-2 top-2 bg-background/80 backdrop-blur-sm"
                >
                  صوتيات
                </CustomLink>
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 absolute right-2 top-2 bg-destructive text-destructive-foreground">
                  خصم 20%
                </div>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-input shadow-xs hover:bg-accent hover:text-accent-foreground size-9 absolute right-2 bottom-2 z-10 rounded-full bg-background/80 backdrop-blur-sm transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  type="button"
                >
                  <span className="sr-only">أضف إلى قائمة الرغبات</span>
                </button>
              </div>
              <div className="p-4 pt-4">
                <Link
                  href={"#"}
                  className="line-clamp-2 text-base font-medium transition-colors group-hover:text-primary"
                >
                  سماعات لاسلكية فاخرة
                </Link>

                <div className="mt-2 flex items-center gap-1.5">
                  <span className="font-medium text-foreground">
                    ١٩٩.٩٩ دولار
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ٢٤٩.٩٩ دولار
                  </span>
                </div>
              </div>
              <div className="flex items-center p-4 pt-0">
                <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 w-full gap-2 transition-all">
                  أضف إلى السلة
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <a href="/products">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground rounded-md has-[>svg]:px-4 group h-12 px-8">
              عرض جميع المنتجات
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
