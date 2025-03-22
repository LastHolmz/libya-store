import NavigationTabs, { HomeTabLink, TabLink } from "@/components/navigation";
import { getProductById, getProducts } from "@/database/products";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export const generatestaticparams = async () => {
  const products = await getProducts({});
  return products.map((product) => ({
    productId: product.id,
  }));
};

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ productId: string }>;
}) => {
  const param = await params;
  const productId = param.productId;
  const product = await getProductById(productId);
  if (!product) {
    return notFound();
  }
  return (
    <div>
      <NavigationTabs className="my-1">
        <HomeTabLink
          href={`/dashboard/inventory/${product.id}`}
          content="معلومات"
        />

        <TabLink
          href={`/dashboard/inventory/${product.id}/colors-and-sizes`}
          content="الألوان والمقاسات"
        />
        <TabLink
          href={`/dashboard/inventory/${product.id}/extensions`}
          content="الإضافات"
        />
        <TabLink
          href={`/dashboard/inventory/${product.id}/description`}
          content="الشرح"
        />
        <TabLink
          href={`/dashboard/inventory/${product.id}/logs`}
          content="السجلات"
        />
      </NavigationTabs>
      {children}
    </div>
  );
};

export default layout;
