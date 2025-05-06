import { getOrderById } from "@/database/orders";
import { fetchAllCities, fetchSubCitiesByCityId } from "@/api/utilties";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Fragment } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { getStatusLabel } from "@/lib/utils";
import Copy from "../components/copy";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) return notFound();
  const cities = await fetchAllCities();
  const subCities = await fetchSubCitiesByCityId(order.cityId || undefined);
  const city = cities.find((city) => city.id === order.cityId);
  const subCity = subCities.find((subCity) => subCity.id === order.subCityId);

  return (
    <div className="container">
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
      <div className="grid grid-cols-2 content-center items-start phone-only:grid-cols-1">
        <div className="mt-4 grid gap-3">
          {/* <Copy value={``}>معرف الطلب: {order.id}</Copy> */}
          <Copy value={`${order?.vanexPackageCode}`}>
            vanex code: {order?.vanexPackageCode}
          </Copy>
          <Copy value={`${order.fullName}`}>اسم العميل: {order.fullName}</Copy>
          <Copy value={order.phone}>رقم الهاتف: {order.phone}</Copy>
          <Copy value={`${order.phoneB}`}>
            رقم الهاتف الثاني: {order.phoneB || "غير متوفر"}
          </Copy>
          <Copy value={order.address}>العنوان: {order.address}</Copy>
          <Copy value={city?.name ?? ""}>المدينة: {city?.name}</Copy>
          <Copy value={`${subCity?.name}`}>الحي: {subCity?.name}</Copy>
          <Copy value={`${order.itemsPrice}`}>
            سعر المنتجات: {order.itemsPrice.toLocaleString()} د.ل
          </Copy>
          <Copy value={`${order.deliveryPrice}`}>
            سعر التوصيل: {order.deliveryPrice.toLocaleString()} د.ل
          </Copy>
          <Copy value={`${order.totalPrice}`}>
            إجمالي السعر: {order.totalPrice.toLocaleString()} د.ل
          </Copy>
          <Copy value={`${order.rest}`}>
            المتبقي: {order.rest.toLocaleString()} د.ل
          </Copy>
          <Copy value={`${getStatusLabel(order.status)}`}>
            الحالة: {getStatusLabel(order.status)}
          </Copy>
          <p>تاريخ الطلب: {new Date(order.createdAt).toLocaleDateString()}</p>

          <p>تاريخ التحديث: {new Date(order.updatedAt).toLocaleDateString()}</p>

          <Copy value={order.barcode}>باركود الطلب: {order.barcode}</Copy>
          <p>ملاحظات: {order?.notes || "لا توجد ملاحظات"}</p>
        </div>
        <div>
          تفاصيل الطلب:
          <ul className="list-disc pl-5">
            <ScrollArea dir="rtl" className="h-[65vh]">
              {order.orderItems.length === 0 ? (
                <Copy value={``}>لا يوجد عناصر في الطلب.</Copy>
              ) : (
                <div className="grid gap-2">
                  {order.orderItems?.map((item, index) => (
                    <Fragment key={index}>
                      <Card className="border-none shadow-none">
                        <CardHeader className="flex flex-row justify-between items-start gap-4">
                          <div className="flex flex-row items-center gap-4">
                            <div className="relative w-16 h-16">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="rounded-md object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-foreground/60">
                                اللون: {item.nameOfColor || "غير متوفر"}
                              </p>
                              <p className="text-sm text-foreground/60">
                                المقاس: {item.nameOfSize}
                              </p>
                              <p className="text-sm text-foreground/60">
                                السعر: {item.price} دينار
                              </p>
                              <p className="text-sm text-foreground/60">
                                الكمية: {item.qty} قطعة
                              </p>
                            </div>
                          </div>
                          <div className="flex h-full flex-col justify-between items-end gap-3">
                            <p className="font-bold text-left text-2xl">
                              {item.qty * item.price} دينار
                            </p>
                          </div>
                        </CardHeader>
                        {/* <CardContent className="max-h-0"></CardContent> */}
                      </Card>
                      <Separator className="my-1" />
                    </Fragment>
                  ))}
                </div>
              )}
            </ScrollArea>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
