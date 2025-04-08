import EmployeesTable from "@/components/reusable-table";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { productsTable, Props } from "./components/products-column";
import { CreateProductForm } from "./components/forms";
import { getProducts } from "@/database/products";
import { getCategories } from "@/database/categories";
// import prisma from "@/prisma/db";

const page = async (props: { searchParams: Promise<{ title?: string }> }) => {
  const searchParams = await props.searchParams;
  const products = await getProducts({ title: searchParams?.title });
  const categories = await getCategories({});
  // await prisma.product.updateMany({
  //   data: {
  //     fakeDiscountRation: 20,
  //     fakeRating: 4.5,
  //     fakeRatingSelected: false,
  //   },
  // });
  return (
    <main className="phone-only:px-4">
      <div className="flex md:justify-between  justify-start flex-col  md:flex-row md:items-center md:mx-2 my-2">
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
              <BreadcrumbPage>ادارة المخزون</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CreateProductForm categories={categories} />
      </div>
      <div className=" my-4 md:container">
        <Suspense fallback={"جاري التحميل"}>
          <EmployeesTable
            searchPlaceholder="البحث بالاسم"
            data={products}
            columns={productsTable as Props[]}
            searchQuery="title"
          />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
