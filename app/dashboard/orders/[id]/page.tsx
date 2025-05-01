import { getOrderById } from "@/database/orders";
import { fetchAllCities, fetchSubCitiesByCityId } from "@/database/utilties";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) return notFound();
  const cities = await fetchAllCities();
  const subCities = await fetchSubCitiesByCityId(order.cityId || undefined);
  const city = cities.find((city) => city.id === order.cityId);
  const subCity = subCities.find((subCity) => subCity.id === order.subCityId);
  return (
    <div>
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
            <BreadcrumbPage>تفاصيل الطلب - {order.barcode}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold">تفاصيل الطلب</h1>
      <div className="mt-4">
        <p>رقم الطلب: {order.id}</p>
        <p>اسم العميل: {order.fullName}</p>
        <p>رقم الهاتف: {order.phone}</p>
        <p>رقم الهاتف الثاني: {order.phoneB || "غير متوفر"}</p>
        <p>العنوان: {order.address}</p>
        <p>المدينة: {city?.name}</p>
        <p>الحي: {subCity?.name}</p>
        <p>إجمالي السعر: {order.totalPrice.toLocaleString()} د.ل</p>
        <p>المتبقي: {order.rest.toLocaleString()} د.ل</p>
        <p>الحالة: {order.status}</p>
        <p>تاريخ الطلب: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>وقت الطلب: {new Date(order.createdAt).toLocaleTimeString()}</p>
        <p>تاريخ التحديث: {new Date(order.updatedAt).toLocaleDateString()}</p>

        <p>وقت التحديث: {new Date(order.updatedAt).toLocaleTimeString()}</p>
        <p>باركود الطلب: {order.barcode}</p>
        <div>
          تفاصيل الطلب:
          <ul className="list-disc pl-5">
            {order.orderItems.map((item) => (
              <li key={item.id}>
                {item.title} - {item.qty} - {item.price.toLocaleString()} د.ل
              </li>
            ))}
          </ul>
        </div>
        <p>ملاحظات: {order?.notes || "لا توجد ملاحظات"}</p>
      </div>
    </div>
  );
};

export default page;
