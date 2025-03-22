import React, { useEffect, useState } from "react";
import { CustomSize } from "./color-selector";
import { Label } from "@/components/ui/label";
import { CustomLink } from "@/components/custom-link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { PiShoppingCart } from "react-icons/pi";

interface Props {
  increment: () => void;
  decrement: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
  getMaxQuantity: () => number;
  buyNow: boolean;
  link: string;
  currentColor: string;
  selectedSize: CustomSize | null;
  defaultSizeId: string;
  cartItem: CartItem;
}

const CartAndBuy = ({
  buyNow,
  currentColor,
  selectedSize,
  link,
  increment,
  decrement,
  handleInputChange,
  quantity,
  getMaxQuantity,
  defaultSizeId,
  cartItem,
}: Props) => {
  const { findCartItemBySizeId, addToCart } = useCart();
  // const [sizeId, setSizeId] = React.useState(defaultSizeId);
  const [currentCartItem, setCurrentCartItem] = useState(
    findCartItemBySizeId(selectedSize?.id ?? "", currentColor)
  );

  useEffect(() => {
    setCurrentCartItem(
      findCartItemBySizeId(selectedSize?.id ?? "", currentColor)
    );
  }, [selectedSize, currentColor, increment, decrement]);

  // console.log("cartItem", existedCartItem);

  return (
    <div className="grid gap-4 phone-only:fixed rounded-md py-4 px-2 bottom-0  left-0 w-full phone-only:bg-secondary">
      <Label htmlFor="qty">اختر الكمية</Label>
      {currentCartItem ? (
        <div className="flex phone-only:w-full  max-w-60 py-2 px-1 justify-between bg-accent phone-only:bg-background rounded-[62px] w-80">
          <button
            onClick={increment}
            className="px-3 text-center content-center"
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
            className="px-3 text-center content-center"
            onClick={decrement}
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

      {buyNow && (
        <CustomLink
          href={`/categories${link}/checking-out?colorId=${currentColor}&sizeId?${selectedSize?.id}&qty=${quantity}`}
          variant={"default"}
          className="md:w-1/2"
        >
          شراء الآن
        </CustomLink>
      )}
    </div>
  );
};

export default CartAndBuy;
