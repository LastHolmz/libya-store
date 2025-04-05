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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ColorSelector from "./components/color-selector";
import Header from "@/app/(interface)/components/header";
import Footer from "@/app/(interface)/components/footer";
import RenderHtml from "@/components/ui/render-html";

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
  searchParams?: Promise<{ header?: string; footer?: string; buynow?: string }>;
}) => {
  const header = (await searchParams)?.header;
  const footer = (await searchParams)?.footer;
  // const buynow = (await searhParams)?.buynow ?? "false";

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

  console.log(product);

  return (
    <div className="relative ">
      {header && header === "false" ? null : <Header />}
      <main className="  min-h-screen">
        <Breadcrumb className="container my-2" dir="rtl">
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

        <div className="flex my-10 phone-only:flex-col phone-only:px-2 mx-auto md:container items-start justify-between phone-only:gap-5 gap-10">
          <div dir="ltr" className="md:w-2/3 w-full mb-10">
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
              // buyNow={buynow === "true"}
              product={product}
            />
            <Separator />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>الدفع عند التسليم</AccordionTrigger>
                <AccordionContent>
                  تختلف أوقات الشحن لأننا نقوم بالشحن على مستوى العالم من مراكز
                  وفاء مختلفة بناءً على موقعك. متوسط وقت الشحن هو حوالي 7 إلى 20
                  يوم عمل. سيتم تحديث رقم تتبعك خلال 3-7 أيام بعد شحن طلبك.{" "}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>سياسة الإرجاع</AccordionTrigger>
                <AccordionContent>
                  ضمان إرجاع أو رد الأموال لمدة 30 يومًا. هذا يؤهلك للمطالبة برد
                  أو تبادل خلال 30 يومًا من استلام سلعك. لتقديم مطالبة، اتصل بنا
                  على support@yourstore.com
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>خدمة العملاء</AccordionTrigger>
                <AccordionContent>
                  فريق خدمة العملاء لدينا هنا دائمًا إذا كنت بحاجة إلى مساعدة.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <div className="container my-2">
        <Separator className="my-2" />
        {product.info && (
          <div className="md:w-1/2 md:mx-auto">
            <h2 className="font-bold text-2xl">التفاصيل</h2>
            <br />
            <RenderHtml html={product.info} />
          </div>
        )}
      </div>
      {footer && footer === "false" ? null : (
        <div className="mb-[146px]">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default page;
