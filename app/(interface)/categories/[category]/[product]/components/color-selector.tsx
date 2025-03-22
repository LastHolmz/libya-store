"use client";

import Color from "@/components/color";
import { CustomLink } from "@/components/custom-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useQueryParam from "@/hooks/use-query-params";
import sizeNames from "@/lib/size-names";
import { cn } from "@/lib/utils";
import { Product, Size } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import CartAndBuy from "./cart";
import { useCart } from "@/context/CartContext";

interface Color {
  sizes: Size[];
  name: string | null;
  id: string;
  color: string | null;
  image: string | null;
}

export interface CustomSize {
  id: string;
  title: string | null;
  qty: number;
  colorShcemeId: string | null;
}

const ColorSelector = ({
  colors,
  sizes,
  link,
  buyNow,
  product,
}: {
  colors: Color[];
  sizes: CustomSize[];
  link: string;
  buyNow: boolean;
  product: Product;
}) => {
  const { setQueryParam, deleteQueryParam } = useQueryParam();
  const searchParams = useSearchParams();

  const [currentColor, setCurrentColor] = useState(
    colors.length > 0 ? colors[0].id : ""
  );
  const [selectedSize, setSelectedSize] = useState<CustomSize | null>(null);
  const [sizesToColor, setSizesToColor] = useState<CustomSize[]>([]);

  const { updateQuantity, addToCart, findCartItemBySizeId, removeFromCart } =
    useCart();

  const [currentCartItem, setCurrentCartItem] = useState(
    findCartItemBySizeId(selectedSize?.id ?? "", currentColor)
  );

  const [quantity, setQuantity] = useState<number>(
    currentCartItem?.quantity ?? (Number(searchParams.get("qty")) || 0)
  );

  // Get the maximum available quantity for the selected size or color
  const getMaxQuantity = () => {
    if (selectedSize) {
      // If a size is selected, use its quantity
      return selectedSize.qty;
    } else if (currentColor) {
      // If no size is selected but a color is selected, sum the quantities of all sizes for that color
      const colorSizes = sizes.filter(
        (size) => size.colorShcemeId === currentColor
      );
      return colorSizes.reduce((acc, size) => acc + size.qty, 0);
    }
    // Default to 0 if no size or color is selected
    return 0;
  };

  // Handle increment
  const increment = () => {
    const maxQty = getMaxQuantity();
    if (quantity < maxQty) {
      setQuantity((prev) => prev + 1);
      // setQueryParam([{ key: "qty", value: String(quantity + 1) }]);
      addToCart({
        colorShcemeId: currentColor,
        image:
          colors.find((color) => color.id === currentColor)?.image ??
          product.image,
        price: product.price,
        productId: product.id,
        quantity: 1,
        title: product.title,
        hexOfColor:
          colors.find((color) => color.id === currentColor)?.color ?? "#000",
        sizeId: selectedSize?.id || "",
        nameOfColor:
          colors.find((color) => color.id === currentColor)?.name || "",
      });
    }
  };

  // Handle decrement
  const decrement = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
    if (currentCartItem?.quantity) {
      // setQueryParam([{ key: "qty", value: String(quantity - 1) }]);
      if (currentCartItem.quantity === 1) {
        removeFromCart(product.id, currentColor, selectedSize?.id || "");
      }
      updateQuantity(
        product.id,
        currentColor,
        selectedSize?.id || "",
        currentCartItem.quantity - 1
      );
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      const newQty = Number(value);
      const maxQty = getMaxQuantity();
      if (newQty <= maxQty) {
        setQuantity(newQty); // Convert to number and update state
        setQueryParam([{ key: "qty", value: value }]);
      }
    }
  };

  // Function to set the selected color and auto-select the first available size
  const setColorSchem = (color: string) => {
    setCurrentColor(color);
    setQueryParam([{ key: "colorId", value: color }]);

    // Find the first available size for the selected color
    const firstAvailableSize = sizes.find(
      (size) => size.colorShcemeId === color && size.qty > 0
    );

    if (firstAvailableSize) {
      setSelectedSize(firstAvailableSize);
      setQueryParam([{ key: "sizeId", value: firstAvailableSize.id }]);
    } else {
      setSelectedSize(null);
      deleteQueryParam(["sizeId"]);
    }

    // Reset quantity to 0 when color changes
    setQuantity(0);
    setQueryParam([{ key: "qty", value: "0" }]);
  };

  // Function to handle size selection
  const handleSizeSelection = (size: CustomSize) => {
    setSelectedSize(size);
    setQueryParam([{ key: "sizeId", value: size.id }]);

    // Reset quantity to 0 when size changes
    setQuantity(0);
    setQueryParam([{ key: "qty", value: "0" }]);
  };

  useEffect(() => {
    // Update sizesToColor whenever the selected color changes
    const filteredSizes = sizes.filter(
      (size) => size.colorShcemeId === currentColor
    );
    setSizesToColor(filteredSizes);

    // Auto-select the first available size if no size is selected
    if (!selectedSize && filteredSizes.length > 0) {
      const firstAvailableSize = filteredSizes.find((size) => size.qty > 0);
      if (firstAvailableSize) {
        setSelectedSize(firstAvailableSize);
        setQueryParam([{ key: "sizeId", value: firstAvailableSize.id }]);
      }
    }
  }, [currentColor, sizes]);

  useEffect(() => {
    setCurrentCartItem(
      findCartItemBySizeId(selectedSize?.id ?? "", currentColor)
    );
  }, [selectedSize, currentColor, increment, decrement]);

  // Check if all sizes for the selected color have titles in the excluded list
  const shouldShowSizeSelector = sizesToColor.some(
    (size) => !sizeNames.includes(size.title || "")
  );

  return (
    <div className="grid gap-4 text-start w-full">
      <Separator className="bg-foreground/20 my-2" />
      <Label>اختر لوناً</Label>
      <div className="flex gap-2 flex-wrap">
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

      {/* Show "Select Size" section only if there are sizes that are not in the excluded list */}
      {shouldShowSizeSelector && (
        <>
          <Separator className="bg-foreground/20 my-2" />
          <Label>اختر حجمً</Label>
          <div className="flex flex-wrap text-base gap-2">
            {sizesToColor
              .filter((size) => !sizeNames.includes(size.title || "")) // Exclude sizes with titles in the excluded list
              .map((size, idx) => (
                <Button
                  disabled={size.colorShcemeId !== currentColor || size.qty < 1}
                  variant={
                    selectedSize?.id === size.id ? "default" : "secondary"
                  }
                  className={cn(
                    "rounded-[62px] transition-all duration-500  px-6 relative overflow-hidden",
                    size.qty < 1 && "cursor-not-allowed"
                    // selectedSize?.id === size.id && ""
                  )}
                  key={idx}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size.title}
                  {size.qty < 1 && (
                    <span
                      className="absolute top-1/2 transform -rotate-[30deg] -translate-y-1/2 -translate-x-1/2
                     left-1/2 w-full h-0.5 bg-foreground"
                    />
                  )}
                </Button>
              ))}
          </div>
        </>
      )}

      <Separator className="bg-foreground/20 my-2 hidden md:block" />
      {/* <div className="grid gap-4 phone-only:fixed rounded-md py-4 px-2 bottom-0  left-0 w-full phone-only::bg-secondary">
        <Label htmlFor="qty">اختر الكمية</Label>
        <div className="flex phone-only:w-full  max-w-60 py-2 px-1 justify-between bg-accent  rounded-[62px] w-80">
          <button
            onClick={increment}
            className="px-3 text-center content-center"
            disabled={quantity >= getMaxQuantity()}
          >
            +
          </button>
          <input
            value={quantity}
            onChange={handleInputChange}
            id="qty"
            type="text"
            className="mx-2 outline-none bg-transparent border-0 shadow-none text-center"
            max={getMaxQuantity()} // Set the max attribute for the input
          />
          <button
            className="px-3 text-center content-center"
            onClick={decrement}
            disabled={quantity === 0}
          >
            -
          </button>
        </div>
        {buyNow && (
          <CustomLink
            href={`/categories${link}/checking-out?colorId=${currentColor}&sizeId?${selectedSize?.id}&qty=${quantity}`}
            variant={"default"}
            className="md:w-1/2"
          >
            شراء الآن
          </CustomLink>
        )}
      </div> */}
      <CartAndBuy
        buyNow={buyNow}
        currentColor={currentColor}
        selectedSize={selectedSize}
        link={link}
        increment={increment}
        decrement={decrement}
        handleInputChange={handleInputChange}
        quantity={quantity}
        getMaxQuantity={getMaxQuantity}
        defaultSizeId={selectedSize?.id || ""}
        cartItem={{
          colorShcemeId: currentColor,
          image:
            colors.find((color) => color.id === currentColor)?.image ??
            product.image,
          price: product.price,
          productId: product.id,
          quantity: 1,
          title: product.title,
          hexOfColor:
            colors.find((color) => color.id === currentColor)?.color ?? "#000",
          sizeId: selectedSize?.id || "",
          nameOfColor:
            colors.find((color) => color.id === currentColor)?.name || "",
        }}
      />
    </div>
  );
};

export default ColorSelector;
