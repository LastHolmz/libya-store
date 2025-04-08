import { Product } from "@prisma/client";
import Image from "next/image";
import RatesOfProduct from "../categories/[category]/[product]/(landing-page)/components/rates-of-product";
import Link from "next/link";

export const ProductCard = ({
  product,
}: {
  product: Product & { reviews: { rating: number }[] };
}) => {
  const sumOfReviews =
    product.reviews.length > 0
      ? product?.reviews?.reduce((acc, review) => acc + review.rating, 0)
      : 0;

  const link = `/categories/${product.categoryId}/${product.id}`;
  return (
    <Link
      href={link}
      className="group cursor-pointer hover:border hover:border-secondary rounded-[20px] w-fit mx-auto"
    >
      <div className="flex shadow-sm flex-col relative h-full border rounded-[20px] overflow-hidden transition-all duration-200 ease-in-out">
        <div className="relative w-[300px] bg-secondary h-[300px] aspect-square overflow-hidden rounded-[20px]">
          {product.image.length < 4 ? (
            <Image
              alt={`صورة - ${product.title}`}
              src={"/images/not-found.png"}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <Image
              alt={`صورة - ${product.title}`}
              src={product.image}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <div>
          <div className="py-4 px-2">
            <div className=" mb-2 text-xl transition-colors group-hover:underline font-bold">
              {product.title}{" "}
            </div>
            <div className="flex gap-4 items-center">
              <RatesOfProduct
                rating={
                  sumOfReviews > 0 ? sumOfReviews / product?.reviews?.length : 5
                }
              />
              <span>
                {product?.reviews?.length > 0
                  ? Number(sumOfReviews / product?.reviews?.length)
                  : 5}
                \<span className="text-forground/50">5</span>
              </span>
            </div>

            <div className="flex items-center gap-2 w-full">
              <div className="my-2 flex items-center gap-4">
                <div className="text-foreground group-hover:underline font-extrabold">
                  {product.price} دينار
                </div>
                <span className="font-extrabold text-muted-foreground line-through">
                  {product.price + 0.2 * product.price} دينار
                </span>
              </div>
              {product?.fakeDiscountRation &&
                product.fakeDiscountRation > 0 && (
                  <div className="py-[6px] text-sm px-[14px] rounded-3xl bg-red-200 text-red-600">
                    -%{product.fakeDiscountRation}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
