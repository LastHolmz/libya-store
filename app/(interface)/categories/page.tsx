import { getCategories } from "@/database/categories";
import Categories from "../components/categories";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
const page = async () => {
  const categories = await getCategories({});
  return (
    <div>
      <Header />
      <main className="bg-background min-h-full">
        <Breadcrumb className="container" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>الأصناف</BreadcrumbPage>
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
            <Categories categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default page;
