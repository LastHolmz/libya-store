import React, { ReactNode } from "react";
import NavigationTabs, { HomeTabLink, TabLink } from "@/components/navigation";
import { getOrderById } from "@/database/orders";
import { OrderProvider } from "@/context/OrderContext";

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const order = await getOrderById(id);
  if (!order) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-2xl font-bold">لا يوجد طلب بهذا الرقم</h1>
      </div>
    );
  }

  return (
    <main className="phone-only:px-4">
      <OrderProvider>
        <NavigationTabs className="my-1">
          <HomeTabLink
            href={`/dashboard/orders/${order.id}`}
            content="التفاصيل"
          />
          <TabLink
            href={`/dashboard/orders/${order.id}/edit`}
            content="تعديل الطلب"
          />

          <TabLink
            href={`/dashboard/orders/${order.id}/convert-to-vanex`}
            content="تحويل إلى فانيكس"
          />
        </NavigationTabs>
        <div>{children}</div>
      </OrderProvider>
    </main>
  );
};

export default layout;
