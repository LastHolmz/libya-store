import React from "react";
import { UpdateOrderForm } from "../../components/forms";
import { getOrderById } from "@/database/orders";
import { notFound } from "next/navigation";
import { fetchAllCities, fetchSubCitiesByCityId } from "@/api/utilties";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ cityId?: string }>;
}) => {
  const { id } = await params;
  const cityId = (await searchParams)?.cityId;

  const order = await getOrderById(id);
  if (!order) return notFound();
  const cities = await fetchAllCities();
  const subCities = await fetchSubCitiesByCityId(Number(cityId) || 0);
  return (
    <div>
      <UpdateOrderForm
        cities={cities}
        order={order}
        orderItems={order.orderItems}
        subCities={subCities}
      />
    </div>
  );
};

export default page;
