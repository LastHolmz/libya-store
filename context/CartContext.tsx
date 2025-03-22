"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  productId: string;
  colorShcemeId: string;
  sizeId: string;
  quantity: number;
  title: string;
  price: number;
  hexOfColor?: string;
  nameOfColor?: string;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    productId: string,
    colorShcemeId: string,
    sizeId: string
  ) => void;
  updateQuantity: (
    productId: string,
    colorShcemeId: string,
    sizeId: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  findCartItemBySizeId: (
    sizeId: string,
    colorId: string
  ) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.colorShcemeId === item.colorShcemeId &&
          cartItem.sizeId === item.sizeId
      );

      if (existingItem) {
        // If the item already exists, update its quantity
        return prevCart.map((cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.colorShcemeId === item.colorShcemeId &&
          cartItem.sizeId === item.sizeId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // If the item doesn't exist, add it to the cart
        return [...prevCart, item];
      }
    });
  };

  // Remove an item from the cart
  const removeFromCart = (
    productId: string,
    colorShcemeId: string,
    sizeId: string
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.colorShcemeId === colorShcemeId &&
            item.sizeId === sizeId
          )
      )
    );
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (
    productId: string,
    colorShcemeId: string,
    sizeId: string,
    quantity: number
  ) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId &&
        item.colorShcemeId === colorShcemeId &&
        item.sizeId === sizeId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Find a cart item by its sizeId and colorId
  const findCartItemBySizeId = (sizeId: string, colorId: string) => {
    return cart.find(
      (item) => item.sizeId === sizeId && item.colorShcemeId === colorId
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        findCartItemBySizeId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
