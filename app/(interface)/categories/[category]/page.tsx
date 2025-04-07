import { getCategoryById } from "@/database/categories";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { notFound } from "next/navigation";
import { getProducts } from "@/database/products";
import { ProductCard } from "../../components/products";
const page = async ({
  params,
}: {
  params: Promise<{
    category: string;
  }>;
}) => {
  const categoryId = (await params).category;
  const category = await getCategoryById(categoryId);
  if (!category) return notFound();
  const products = await getProducts({ categoryId });

  return (
    <div>
      <Header />
      <main className="min-h-full">
        <Breadcrumb className="container" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/categories`}>الأصناف</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products?.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default page;
