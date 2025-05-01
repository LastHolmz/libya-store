import React, { ReactNode } from "react";
import NavigationTabs, { HomeTabLink, TabLink } from "@/components/navigation";
import { getOrderById } from "@/database/orders";
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
          href={`/dashboard/orders/${order.id}/convert-and-vanex`}
          content="تحويل إلى فانيكس"
        />
      </NavigationTabs>
      <div>{children}</div>
    </main>
  );
};

export default layout;
