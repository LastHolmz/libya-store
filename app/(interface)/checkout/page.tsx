import Header from "@/app/(interface)/components/header";
import { Suspense } from "react";
import { fetchAllCities, fetchSubCitiesByCityId } from "@/api/utilties";
import CheckOutForm from "./components/check-out-forms";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
const page = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    cityId?: string;
  }>;
}) => {
  const cityId = (await searchParams)?.cityId;

  const cities = await fetchAllCities();
  const subCities = await fetchSubCitiesByCityId(Number(cityId));
  return (
    <div className="bg-background">
      <Header />
      <Breadcrumb className="w-[75%] phone-only:w-[90%] mx-auto mt-2" dir="rtl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/`}>الرئيسية</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>الدفع</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <h1 className="text-2xl font-bold">جاري معالجة الطلب</h1>
            <p className="mt-4 text-lg">الرجاء الانتظار...</p>
          </div>
        }
      >
        <CheckOutForm cities={cities} subCities={subCities} />
      </Suspense>
    </div>
  );
};

export default page;
