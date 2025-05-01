import React, { useEffect, useState } from "react";
import { CustomSize } from "./color-selector";
import { Label } from "@/components/ui/label";
import { CustomLink } from "@/components/custom-link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { PiShoppingCart } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  increment: (buynow?: boolean) => void;
  decrement: (buynow?: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
  getMaxQuantity: () => number;
  // buyNow: boolean;
  link: string;
  currentColor: string;
  selectedSize: CustomSize | null;
  // defaultSizeId: string;
  cartItem: CartItem;
}

const CartAndBuy = ({
  // buyNow,
  currentColor,
  selectedSize,
  link,
  increment,
  decrement,
  handleInputChange,
  quantity,
  getMaxQuantity,
  cartItem,
}: Props) => {
  const searchParams = useSearchParams();
  const buynow = searchParams.get("buynow");
  // const qty = searchParams.get("qty");

  const { findCartItemBySizeId, addToCart } = useCart();
  const [currentCartItem, setCurrentCartItem] = useState(
    findCartItemBySizeId(selectedSize?.id ?? "", currentColor)
  );

  useEffect(() => {
    setCurrentCartItem(
      findCartItemBySizeId(selectedSize?.id ?? "", currentColor)
    );
  }, [selectedSize, currentColor, increment, decrement]);

  return (
    <div className="grid gap-4 phone-only:fixed rounded-md py-4 px-2 bottom-0  left-0 w-full phone-only:bg-secondary z-50">
      <Label>اختر الكمية</Label>

      {buynow === "true" ? (
        <div className="md:flex md:gap-2 items-center">
          <div className="flex phone-only:w-full  md:max-w-60 py-2 px-1 justify-between bg-accent phone-only:bg-background rounded-[62px] w-80">
            <button
              onClick={() => increment(buynow === "true")}
              className={cn(
                "px-3 text-center content-center",
                quantity >= getMaxQuantity() &&
                  "cursor-not-allowed text-foreground/50"
              )}
              disabled={quantity >= getMaxQuantity()}
            >
              +
            </button>
            <input
              value={quantity ?? ""}
              onChange={handleInputChange}
              id="qty"
              type="text"
              className="mx-2 outline-none bg-transparent border-0 shadow-none text-center"
              max={getMaxQuantity()}
              // Set the max attribute for the input
            />
            <button
              className={cn(
                "px-3 text-center content-center",
                quantity === 0 && "cursor-not-allowed text-foreground/50"
              )}
              onClick={() => decrement(buynow === "true")}
              disabled={Number(quantity) === 0}
            >
              -
            </button>
          </div>
          <CustomLink
            href={`/categories${link}/checking-out?colorId=${currentColor}&sizeId=${selectedSize?.id}&qty=${quantity}`}
            variant={"default"}
            className="md:w-1/2 w-full phone-only:mt-2 rounded-[62px]"
          >
            شراء الآن
          </CustomLink>
        </div>
      ) : currentCartItem ? (
        <div className="flex phone-only:w-full  md:max-w-60 py-2 px-1 justify-between bg-accent phone-only:bg-background rounded-[62px] w-80">
          <button
            onClick={() => increment(buynow === "true")}
            className={cn(
              "px-3 text-center content-center",
              quantity >= getMaxQuantity() &&
                "cursor-not-allowed text-foreground/50"
            )}
            disabled={quantity >= getMaxQuantity()}
          >
            +
          </button>
          <input
            value={currentCartItem.quantity}
            onChange={handleInputChange}
            id="qty"
            type="text"
            className="mx-2 outline-none bg-transparent border-0 shadow-none text-center"
            max={getMaxQuantity()}
            // Set the max attribute for the input
          />
          <button
            className={cn(
              "px-3 text-center content-center",
              currentCartItem.quantity === 0 &&
                "cursor-not-allowed text-foreground/50"
            )}
            onClick={() => decrement(buynow === "true")}
            disabled={currentCartItem.quantity === 0}
          >
            -
          </button>
        </div>
      ) : (
        <Button
          className="rounded-[62px] md:max-w-sm"
          onClick={() => addToCart(cartItem)}
        >
          اضف الى السلة
          <PiShoppingCart />
        </Button>
      )}
    </div>
  );
};

export default CartAndBuy;
