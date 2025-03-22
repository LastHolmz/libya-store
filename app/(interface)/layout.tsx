import React, { ReactNode } from "react";
import Header from "./components/header";
import { CartProvider } from "@/context/CartContext";

const layout = async ({
  children,
}: // searchParams,
{
  children: ReactNode;
  // searchParams?: Promise<{ header?: string }>;
}) => {
  // const header = (await searchParams)?.header;
  return (
    <div>
      <CartProvider>{children}</CartProvider>
    </div>
  );
};

export default layout;
