import { ProductCard } from "@/app/(interface)/components/products";
import { getProducts } from "@/database/products";

const FeaturedProducts = async () => {
  const products = await getProducts({});
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
          {products?.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}
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
