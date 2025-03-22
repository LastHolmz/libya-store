// components/CartSheet.tsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const CartSheet = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Cart ({cart.length})</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <Card
                  key={`${item.productId}-${item.colorShcemeId}-${item.sizeId}`}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        Color: {item.nameOfColor || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Size: {item.sizeId}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">${item.price}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.colorShcemeId,
                              item.sizeId,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.colorShcemeId,
                              item.sizeId,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        removeFromCart(
                          item.productId,
                          item.colorShcemeId,
                          item.sizeId
                        )
                      }
                    >
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <div className="flex justify-end">
                <Button variant="destructive" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
