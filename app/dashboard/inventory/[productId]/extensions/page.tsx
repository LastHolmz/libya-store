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
import {
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
              <BreadcrumbPage>الإضافات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="my-4 relative rounded-md shadow-md bg-accent p-1 md:p-4 mih-h-[50vh]">
          <AddExtensionToProductForm id={product.id} />
          <br className="min-h-5" />
          <div className="grid lg:grid-cols-2 md:grid-cols-2  gap-10">
            {product.extensions.map((e, i) => (
              <div
                key={i}
                className="phone-only:text-center group shadow-md rounded-md bg-card  hover:bg-primary/20 py-2 px-4 transition-all duration-500  flex justify-between items-center"
              >
                {e.image && (
                  <div className="overflow-hidden rounded-md h-12 w-12 aspect-square">
                    <Image
                      src={e.image}
                      alt={`${e.title}-image`}
                      width={100}
                      height={100}
                      className=" w-full h-full object-cover"
                    />
                  </div>
                )}
                <span>{e.title}</span>
                <span>{e.qty} ق</span>
                <span>{e.price} د</span>

                <div className="flex phone-only:hidden">
                  <UpdateExtensionOfProductForm productId={product.id} {...e} />
                  <DeleteExtensionOfProductForm id={e.id} />
                </div>
                <Popover>
                  <PopoverTrigger className="hidden phone-only:block">
                    <CiMenuKebab />
                  </PopoverTrigger>
                  <PopoverContent>
                    <ul className="grid gap-2">
                      <li className="p-2 hover:bg-accent  border-[0.5px] border-foreground/20 rounded-md">
                        <UpdateExtensionOfProductForm
                          productId={product.id}
                          {...e}
                          trigger={
                            <button className="w-full text-start ">
                              تحديث
                            </button>
                          }
                        />
                      </li>
                      <li className="p-2 hover:bg-accent  border-[0.5px] border-foreground/20 rounded-md">
                        <DeleteExtensionOfProductForm
                          id={e.id}
                          trigger={
                            <button className="w-full text-start ">حذف</button>
                          }
                        />
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
