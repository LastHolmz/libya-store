import { getProductById } from "@/database/products";
import { notFound } from "next/navigation";

const page = async ({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) => {
  const { category: categoryId, product: productId } = await params;
  const product = await getProductById(productId);
  if (!product) {
    return notFound();
  }
  return <main></main>;
};

export default page;
