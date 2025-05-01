import Header from "@/app/(interface)/components/header";
import { getProductById } from "@/database/products";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CheckOutForm from "../components/check-out-forms";
import { fetchAllCities, fetchSubCitiesByCityId } from "@/database/utilties";

const page = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    colorId?: string;
    sizeId?: string;
    extensionId?: string;
    qty?: string;
    cityId?: string;
  }>;
  params: Promise<{ product: string }>;
}) => {
  const { colorId, sizeId, cityId, qty } = await searchParams;
  const { product: productId } = await params;

  const product = await getProductById(productId);
  if (!product) return notFound();

  const productColor = product.colorShcemes.find(
    (color) => color.id === colorId
  );

  const productSize = productColor?.sizes.find((size) => size.id === sizeId);

  const quantity = Number(qty) || 1;

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
        <CheckOutForm
          product={product}
          qty={quantity}
          productColor={productColor}
          productSize={productSize}
          cities={cities}
          subCities={subCities}
        />
      </Suspense>
    </div>
  );
};

export default page;
