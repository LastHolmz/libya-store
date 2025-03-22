// components/AddToCartButton.tsx
import { useCart } from "@/context/CartContext";
import React from "react";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  colorShcemeId: string;
  sizeId: string;
  hexOfColor?: string;
  nameOfColor?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  colorShcemeId,
  sizeId,
  hexOfColor,
  nameOfColor,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      productId: product.id,
      colorShcemeId,
      sizeId,
      quantity: 1,
      title: product.title,
      price: product.price,
      hexOfColor,
      nameOfColor,
      image: product.image,
    };
    addToCart(cartItem);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
