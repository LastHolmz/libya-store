import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getCategories } from "@/database/categories";
import { CreateCategory } from "./components/forms";
import Grid from "./components/grid";
const page = async (props: {
  searchParams: Promise<{ fullName?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const categories = await getCategories();
  console.log(categories);

  return (
    <main className="phone-only:px-4">
      <div className="container my-2">
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
              <BreadcrumbPage>ادارة الأصناف</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CreateCategory />
        <Grid data={categories} />
      </div>
    </main>
  );
};

export default page;
