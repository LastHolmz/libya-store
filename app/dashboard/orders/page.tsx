import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getAllOrders } from "@/database/orders";
// import { CreateOrderForm } from "./components/forms";
import { fetchAllCities } from "@/database/utilties";
import OrderTable from "./components/table";
const page = async (props: { searchParams: Promise<{ title?: string }> }) => {
  const searchParams = await props.searchParams;
  const orders = await getAllOrders();
  const cities = await fetchAllCities();

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
              <BreadcrumbPage>ادارة الفواتير</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <CreateOrderForm /> */}
      </div>
      <div className=" my-4 md:container">
        <OrderTable cities={cities} orders={orders} subCities={[]} />
      </div>
    </main>
  );
};

export default page;
