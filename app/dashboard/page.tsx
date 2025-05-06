import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const dashboardPage = async () => {
  return (
    <main className="container mt-4">
      <Breadcrumb className="my-2" dir="rtl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/`}>الرئيسية</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>لوحة التحكم</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-bold text-right text-2xl">لوحة التحكم</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:gap-3 md:gap-2 gap-1 lg:gap-4 my-4 sm:grid-cols-2"></div>
      <div>
        <p></p>
      </div>
    </main>
  );
};

export default dashboardPage;
