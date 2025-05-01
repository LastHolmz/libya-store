"use client";

import OrdersTable from "@/components/reusable-table";
import { Suspense } from "react";
import { getOrdersTable } from "./orders-column";
import { OrdersProps } from "@/types/interfaces";

interface Props {
  cities: City[];
  subCities: SubCity[];
  orders: OrdersProps[];
}

const OrderTable = ({ cities, orders, subCities }: Props) => {
  return (
    <Suspense fallback={"جاري التحميل"}>
      <OrdersTable
        searchPlaceholder="البحث بالاسم"
        data={orders}
        columns={getOrdersTable(cities, [])}
        searchQuery="title"
      />
    </Suspense>
  );
};

export default OrderTable;
