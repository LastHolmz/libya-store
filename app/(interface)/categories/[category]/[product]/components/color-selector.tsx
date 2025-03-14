"use client";

import Color from "@/components/color";
import { CustomLink } from "@/components/custom-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { defaultSize } from "@/constants";
import useQueryParam from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";
import { Size } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
interface Color {
  sizes: Size[];
  name: string | null;
  id: string;
  color: string | null;
  image: string | null;
}
interface CustomSize {
  id: string;
  title: string | null;
  qty: number;
  colorShcemeId: string | null;
}
const ColorSelector = ({
  colors,
  sizes,
  link,
}: {
  colors: Color[];
  sizes: CustomSize[];
  link: string;
}) => {
  const { setQueryParam } = useQueryParam();
  const searchParams = useSearchParams();
  const [currentColor, setCurrentColor] = useState(
    colors.length > 0 ? colors[0].id : ""
  );
  const [selectedSize, setSelectedSize] = useState<CustomSize | null>(null);
  const [sizesToColor, setSizesToColor] = useState<CustomSize[]>([]);

  const [quantity, setQuantity] = useState<number>(
    Number(searchParams.get("qty")) || 0
  );

  // Handle increment
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  // Handle decrement
  const decrement = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent negative values
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setQuantity(Number(value)); // Convert to number and update state
      setQueryParam([{ key: "qty", value: value }]);
    }
  };

  const setColorSchem = (color: string) => {
    setCurrentColor(color);
    setQueryParam([{ key: "colorId", value: currentColor }]);
  };

  const setSizeId = () => {
    if (selectedSize?.id) {
      setQueryParam([{ key: "sizeId", value: selectedSize.id }]);
    }
  };

  useEffect(() => {
    setSizesToColor(
      sizes.filter((size) => size.colorShcemeId === currentColor)
    );
  }, [currentColor]);

  return (
    <div className="grid gap-4 text-start w-full">
      <Separator className="bg-foreground/20 my-2" />
      <Label>اختر لوناً</Label>
      <div className="flex gap-2">
        {colors.map((color, index) => {
          const number = color.sizes.reduce(
            (sizeAcc, size) => sizeAcc + size.qty,
            0
          );
          return (
            <button
              key={index}
              className={cn(number < 1 && "opacity-70 cursor-not-allowed")}
              onClick={() => setColorSchem(color.id)}
              disabled={number < 1}
            >
              <Color
                className={cn(
                  "w-12 h-12  shadow-md flex justify-center items-center",
                  currentColor === color.id &&
                    "border-[1px] border-popover-foreground shadow-lg scale-105"
                )}
                {...color}
              >
                <MdDone
                  className={cn(
                    "text-white hidden",
                    currentColor === color.id && "block"
                  )}
                />
              </Color>
            </button>
          );
        })}
      </div>
      {sizesToColor.length > 0 && (
        <>
          <Separator className="bg-foreground/20 my-2" />
          <Label>اختر حجمً</Label>
          <div className="flex text-base gap-2">
            {sizesToColor
              .filter((s) => s.title !== defaultSize)
              .map((size, idx) => (
                <Button
                  disabled={size.colorShcemeId !== currentColor || size.qty < 1}
                  variant={selectedSize?.id === size.id ? "default" : "outline"}
                  className={cn(
                    "rounded-lg relative",
                    size.qty < 1 && "cursor-not-allowed"
                  )}
                  key={idx}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeId();
                  }}
                >
                  {size.title}
                  {size.qty < 1 && (
                    <span className="absolute top-1/2 transform -translate-y-1/2 left-0 w-full h-0.5 bg-foreground"></span>
                  )}
                </Button>
              ))}
          </div>
        </>
      )}
      <Separator className="bg-foreground/20 my-2" />
      <Label htmlFor="qty">اختر الكمية</Label>
      <div className="flex phone-only:w-full w-80">
        <Button onClick={increment}>+</Button>
        <Input
          value={quantity}
          onChange={handleInputChange}
          id="qty"
          type="number"
          className="mx-2"
        />
        <Button
          onClick={decrement}
          disabled={quantity === 0} // Disable if quantity is 0
        >
          -
        </Button>
      </div>
      <CustomLink
        href={`/categories${link}/checking-out?colorId=${currentColor}&sizeId?${selectedSize?.id}&qty=${quantity}`}
        variant={"default"}
        className="md:w-1/2"
      >
        شراء الآن
      </CustomLink>
    </div>
  );
};

export default ColorSelector;
