"use client";
import { useState } from "react";
import {
  AddColorsToProductForm,
  DeleteColorsOfProductForm,
  UpdateColorsOfProductForm,
} from "../../components/forms";
import { Product } from "@prisma/client";
import { cn } from "@/lib/utils";

const ColorPicker = ({
  product,
}: {
  product: Product & {
    colorShcemes: {
      id: string;
      color: string | null;
      name: string | null;
      image: string | null;
      vanexId: number | null;
      sizes: {
        id: string;
        title: string | null;
        qty: number;
        colorShcemeId: string | null;
      }[];
    }[];
  };
}) => {
  const [currentColor, setCurrentColor] = useState<string | null>(
    product.colorShcemes[0]?.id
  );
  return (
    <div className="w-full h-full">
      {/* colors info */}
      <div className="grid gap-4 relative w-full">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">الألوان</h2>
          <AddColorsToProductForm id={product.id} />
        </div>{" "}
        <div className="flex gap-1 flex-wrap text-sm">
          {product.colorShcemes.length > 0 ? (
            product.colorShcemes.map((colorScheme) => (
              <div
                onClick={() => setCurrentColor(colorScheme.id)}
                key={colorScheme.id}
                className={cn(
                  "bg-background group flex gap-4 transition-all duration-300 items-center hover:bg-primary/70 justify-between rounded px-2 py-1 cursor-pointer",
                  currentColor === colorScheme.id && "bg-primary"
                )}
              >
                {colorScheme.name}
                <UpdateColorsOfProductForm colorShceme={colorScheme} />
                <DeleteColorsOfProductForm id={colorScheme.id} />
              </div>
            ))
          ) : (
            <p className="text-foreground/80">لا يوجد الوان</p>
          )}
        </div>
      </div>
      {/* sizes info */}
      <div className="h-1/2 gap-4 mt-10">
        <h3 className="font-semibold  my-4">الأحجام</h3>
        <div className="flex gap-1 flex-wrap text-sm">
          {product.colorShcemes.map((colorScheme) =>
            colorScheme.sizes.map((size) => (
              <div
                key={size.id}
                onClick={() => setCurrentColor(colorScheme.id)}
                className={cn(
                  "flex gap-3 transition-all duration-300 h-fit cursor-pointer py-1 px-2 rounded bg-background text-sm",
                  currentColor === colorScheme.id && "bg-primary"
                )}
              >
                <span>{size.title}</span>
                <span>{size.qty}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
