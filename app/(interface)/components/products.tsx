import { CustomLink } from "@/components/custom-link";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({ product }: { product: Product }) => {
  const link = `/categories/${product.categoryId}/${product.id}`;
  return (
    <div className="group">
      <div className="bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm relative h-full overflow-hidden rounded-lg transition-all duration-200 ease-in-out hover:shadow-md">
        <div className="relative aspect-square -mt-6 overflow-hidden rounded-t-lg">
          <Link
            href={link}
            className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent"
          ></Link>
          <Image
            alt={`صورة - ${product.title}`}
            src={product.image}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* <CustomLink
            href={link}
            className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground absolute left-2 top-2 bg-background/80 backdrop-blur-sm"
          >
            صوتيات
          </CustomLink> */}
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
            href={link}
            className="line-clamp-2 text-base font-medium transition-colors group-hover:text-primary"
          >
            {product.title}{" "}
          </Link>

          <div className="mt-2 flex items-center gap-1.5">
            <span className="font-medium text-foreground">
              {product.price} دينار
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {product.price + 0.2 * product.price} دينار
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
  );
};
