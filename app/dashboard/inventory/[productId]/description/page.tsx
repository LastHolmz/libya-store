import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getProductById } from "@/database/products";
import { notFound } from "next/navigation";
import RenderHtml from "@/components/ui/render-html";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/custom-link";

const page = async (props: { params: Promise<{ productId: string }> }) => {
  const params = await props.params;
  const productId = params.productId;
  const product = await getProductById(productId);
  if (!product) {
    return notFound();
  }

  return (
    <main className="phone-only:px-4">
      <div className="md:container phone-only:px-0">
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
                <Link href={`/dashboard/inventory`}>ادارة المخزون</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard/inventory/${product.id}`}>
                  {product.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>الشرح</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="my-4 rounded-md shadow-md bg-accent p-1 md:p-4 min-h-[50vh] content-center">
          <div className="">
            {product?.info ? (
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold mb-4">الشرح</h1>
                  <CustomLink variant={"default"} href="description/add">
                    تحديث الشرح
                  </CustomLink>
                </div>
                <div className="w-1/2 mx-auto">
                  <RenderHtml html={product.info} />
                </div>
              </div>
            ) : (
              <>
                <div className="text-center w-fit mx-auto content-center">
                  <p className="mb-2">لا يوجد شرح</p>
                  <CustomLink variant={"default"} href="description/add">
                    إضافة شرح
                  </CustomLink>
                </div>
              </>
            )}

            {/* <Editor content={enBody} onChange={setEnBody} /> */}
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
