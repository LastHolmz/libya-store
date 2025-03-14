import { getProductById, getProducts } from "@/database/products";
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
import { getCategoryById } from "@/database/categories";
import ThumnailSlider from "./components/product-carsouel";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { defaultSize } from "@/constants";
import ColorSelector from "./components/color-selector";
import Header from "@/app/(interface)/components/header";

// export const generatestaticparams = async () => {
//   const products = await getProducts({});
//   return products.map((product) => ({
//     product: product.id,
//   }));
// };

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; product: string }>;
  searchParams?: Promise<{ header?: string }>;
}) => {
  const header = (await searchParams)?.header;

  const { category: categoryId, product: productId } = await params;
  const product = await getProductById(productId);
  const category = await getCategoryById(categoryId);
  if (!product) {
    return notFound();
  }
  const images: string[] = [
    product.image,
    ...product.colorShcemes
      .map((c) => c.image)
      .filter((image): image is string => image !== null),
  ];
  const sizes = product.colorShcemes
    .map((color) => color.sizes.map((size) => size))
    .flat();

  return (
    <div>
      {header && header === "false" ? null : <Header />}
      <main className="bg-secondary min-h-screen">
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
                <Link href={`/categories`}>الأصناف</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/categories/${categoryId}`}>
                  {category?.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex bg-background py-10 phone-only:py-4 shadow-lg rounded-lg phone-only:flex-col container mt-10 items-start justify-between phone-only:gap-5 gap-10">
          <div dir="ltr" className="md:w-2/3 w-full">
            <ThumnailSlider images={images} />
          </div>
          <div className="grid gap-4 text-start w-full">
            <h1 className="font-extrabold md:text-3xl text-2xl lg:text-5xl">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 md:gap-4">
              <b className="text-xl font-normal md:text-2xl">
                {product.price} د
              </b>
              <span className="rounded-lg bg-red-400 text-white px-2 ">
                -40%
              </span>
              <span className="text-xl font-normal text-foreground/60 line-through md:text-2xl">
                {product.price + (product.price * 40) / 100} د
              </span>
            </div>
            <p className="text-foreground/70 text-sm">{product.description}</p>
            <ColorSelector
              link={`/${categoryId}/${productId}`}
              sizes={sizes}
              colors={product.colorShcemes}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
