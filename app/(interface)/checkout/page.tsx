import Header from "@/app/(interface)/components/header";
import { Suspense } from "react";
import { fetchAllCities, fetchSubCitiesByCityId } from "@/database/utilties";
import CheckOutForm from "./components/check-out-forms";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    cityId?: string;
  }>;
}) => {
  const { cityId } = await searchParams;

  const cities = await fetchAllCities();
  const subCities = await fetchSubCitiesByCityId(Number(cityId));
  return (
    <div className="bg-background">
      <Header />
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
