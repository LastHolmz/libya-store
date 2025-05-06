import React from "react";
import { CreatePackageForm } from "../../components/forms";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getOrderById } from "@/database/orders";
import { fetchAllCities, fetchSubCitiesByCityId } from "@/api/utilties";
import { notFound } from "next/navigation";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cityId?: string }>;
}) => {
  const { id } = await params;
  const cityId = (await searchParams).cityId;
  const order = await getOrderById(id);
  if (!order) return notFound();
  const cities = await fetchAllCities();
  const subCities = await fetchSubCitiesByCityId(
    cityId ? Number(cityId) : order?.cityId || 0
  );
  return (
    <div className="md:container">
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
              <Link href={`/dashboard/orders`}>ادارة الفواتير</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/dashboard/orders/${order.id}`}>
                تفاصيل الطلب - {order.barcode}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>تحويل الطلب إلى فانيكس</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1>تحويل إلى فانيكس</h1>
      <p>
        هذه الصفحة مخصصة لتحويل الطلب إلى فانيكس. يمكنك استخدام النموذج أدناه
        لتحويل طلبك.
      </p>

      <CreatePackageForm
        orderId={order.id}
        cities={cities}
        subCities={subCities}
        order={order}
      />
    </div>
  );
};

export default page;
