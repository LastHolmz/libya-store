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
import Image from "next/image";
import UpdateConfigForm, {
  AddExtensionToProductForm,
  DeleteExtensionOfProductForm,
  UpdateExtensionOfProductForm,
} from "../../components/forms";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiMenuKebab } from "react-icons/ci";

const page = async (props: { params: Promise<{ productId: string }> }) => {
  const params = await props.params;
  const productId = params.productId;
  const product = await getProductById(productId);
  if (!product) {
    return notFound();
  }

  return (
    <main className="phone-only:px-4">
      <div className="md:container  min-h-[50vh] phone-only:px-0">
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
              <BreadcrumbPage>الإعدادات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="my-4 relative rounded-md shadow-md bg-accent p-1 md:p-4 min-h-[50vh]">
          <h2 className="font-bold">الإعدادات</h2>
          <UpdateConfigForm id={product.id} config={{ ...product }} />
        </section>
      </div>
    </main>
  );
};

export default page;
