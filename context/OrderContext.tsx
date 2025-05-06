"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface OrderContextType {
  order: CartItem[];
  addToOrder: (item: CartItem) => void;
  removeFromOrder: (
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
  clearOrder: () => void;
  findOrderItemBySizeId: (
    sizeId: string,
    colorId: string
  ) => CartItem | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [order, setOrder] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("order");
    if (savedCart) {
      setOrder(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  // Add an item to the cart
  const addToOrder = (item: CartItem) => {
    setOrder((prevCart) => {
      const existingItem = prevCart.find(
        (orderItem) =>
          orderItem.productId === item.productId &&
          orderItem.colorShcemeId === item.colorShcemeId &&
          orderItem.sizeId === item.sizeId
      );

      if (existingItem) {
        // If the item already exists, update its quantity
        return prevCart.map((orderItem) =>
          orderItem.productId === item.productId &&
          orderItem.colorShcemeId === item.colorShcemeId &&
          orderItem.sizeId === item.sizeId
            ? { ...orderItem, quantity: orderItem.quantity + item.quantity }
            : orderItem
        );
      } else {
        // If the item doesn't exist, add it to the cart
        return [...prevCart, item];
      }
    });
  };

  // Remove an item from the cart
  const removeFromOrder = (
    productId: string,
    colorShcemeId: string,
    sizeId: string
  ) => {
    setOrder((prevCart) =>
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
    setOrder((prevCart) =>
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
  const clearOrder = () => {
    setOrder([]);
  };

  // Find a cart item by its sizeId and colorId
  const findOrderItemBySizeId = (sizeId: string, colorId: string) => {
    return order.find(
      (item) => item.sizeId === sizeId && item.colorShcemeId === colorId
    );
  };

  return (
    <OrderContext.Provider
      value={{
        order: order,
        addToOrder,
        removeFromOrder,
        updateQuantity,
        clearOrder,
        findOrderItemBySizeId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
};
