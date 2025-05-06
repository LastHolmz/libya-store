import React, { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <CartProvider>{children}</CartProvider>
    </div>
  );
};

export default layout;
