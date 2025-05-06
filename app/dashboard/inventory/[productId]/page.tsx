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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import SelectColor from "@/components/color";

const page = async (props: { params: Promise<{ productId: string }> }) => {
  const params = await props.params;
  const productId = params.productId;
  const product = await getProductById(productId);
  if (!product) {
    return notFound();
  }
  const qty = product.colorShcemes.reduce((acc, colorScheme) => {
    return (
      acc + colorScheme.sizes.reduce((sizeAcc, size) => sizeAcc + size.qty, 0)
    );
  }, 0);
  const extensionQty = product.extensions.reduce((acc, extension) => {
    return acc + extension.qty;
  }, 0);
  console.log(product.colorShcemes);

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
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="my-4 rounded-md shadow-md bg-accent p-1 md:p-4">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="phone-only:text-center">
              <div className="grid gap-4 ">
                <h2 className="font-semibold">المعلومات الاساسية</h2>
                <div className="grid grid-cols-2 text-sm">
                  <span className="text-foreground/80">الاسم</span>
                  <p className="text-base">{product.title}</p>
                </div>
                <div className="grid grid-cols-2 text-sm">
                  <span className="text-foreground/80">السعر</span>
                  <p className="text-base">{product.price} د.ل</p>
                </div>
                <div className="grid grid-cols-2 text-sm">
                  <span className="text-foreground/80">الباركود</span>
                  <p className="text-base">{product.barcode}</p>
                </div>
                <div className="grid grid-cols-2 text-sm">
                  <span className="text-foreground/80">الكمية المتاحة</span>
                  <p className="text-base">{qty}</p>
                </div>
              </div>
            </div>
            <div className="grid phone-only:mt-10 items-center text-center">
              <div className="relative border-dashed lg:w-[350px] p-4 rounded-lg border-2 w-[180px] phone-only:w-full border-foreground/20 flex justify-center items-center mx-auto">
                <div className="lg:w-[300px] w-full mx-auto rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.title}-image`}
                    width={400}
                    height={400}
                    className=" object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 text-sm">
                <span className="text-foreground/80">المخزون المتبقي</span>
                <p className="text-base">{qty}</p>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <span className="text-foreground/80">مخزون الإضافات</span>
                <p className="text-base">{extensionQty}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
