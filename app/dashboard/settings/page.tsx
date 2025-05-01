import PixelsTable from "@/components/reusable-table";
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
import { pixelsTable } from "./components/pixels-columns";
import { getPixels } from "@/database/pixels";
import { CreatePixelForm } from "./components/forms";
const page = async (props: { searchParams: Promise<{ title?: string }> }) => {
  const searchParams = await props.searchParams;
  const pixels = await getPixels({ title: searchParams?.title });

  return (
    <main className="phone-only:px-4">
      <div className=" flex md:justify-between  justify-start flex-col  md:flex-row md:items-center md:mx-2 my-2">
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
              <BreadcrumbPage>الإعدادات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <CreateUserForm /> */}
        <CreatePixelForm />
      </div>
      <div className=" my-4 md:container">
        <Suspense fallback={"جاري التحميل"}>
          <PixelsTable
            searchPlaceholder="البحث بالاسم"
            data={pixels}
            columns={pixelsTable}
            searchQuery="title"
          />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
