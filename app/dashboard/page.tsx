import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { PiArticleMediumThin } from "react-icons/pi";

const dashboardPage = async ({}: // params,
{
  // params: Promise<{ lang: string }>;
}) => {
  // const employees = await getUsers({});
  // const articles = await getArticles({});
  // const lang = (await params).lang;
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
      <div></div>
    </main>
  );
};

export default dashboardPage;
