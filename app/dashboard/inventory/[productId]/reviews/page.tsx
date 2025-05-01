import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getProductById } from "@/database/products";
import { notFound } from "next/navigation";
import { getReviews } from "@/database/reviews";
import { WriteReviewForm } from "@/app/(interface)/categories/[category]/[product]/(landing-page)/components/forms";
import { Suspense } from "react";
import ReusableTable from "@/components/reusable-table";
import { reviewsTable } from "./components/reviews-column";

const page = async (props: { params: Promise<{ productId: string }> }) => {
  const params = await props.params;
  const productId = params.productId;
  const product = await getProductById(productId);
  if (!product) {
    return notFound();
  }
  const reviews = await getReviews({ productId });

  return (
    <main className="phone-only:px-4">
      <div className="md:container  min-h-[50vh] phone-only:px-0">
        <Breadcrumb className="my-2" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard`}>لوحة التحكم</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard/inventory`}>ادارة المخزون</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard/inventory/${product.id}`}>
                  {product.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>التعليقات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="my-4 relative rounded-md shadow-md bg-accent p-1 md:p-4 min-h-[50vh]">
          <div className="flex justify-between items-center my-2 phone-only:flex-col">
            <h1 className="font-bold">التعليقات</h1>
            <WriteReviewForm productId={productId} />
          </div>{" "}
          <div className=" my-4 md:container">
            <Suspense fallback={"جاري التحميل"}>
              <ReusableTable
                searchPlaceholder="البحث بالاسم"
                data={reviews}
                columns={reviewsTable}
                searchQuery="title"
              />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
