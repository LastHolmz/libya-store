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
import { Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";

export const CartSheet = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">فتح السلة ({cart.length})</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>سلتك</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <ScrollArea dir="rtl" className="h-[80vh]">
            {cart.length === 0 ? (
              <p>سلتك فارغة.</p>
            ) : (
              <div className="grid gap-2">
                {cart.map((item, index) => (
                  <Fragment key={index}>
                    <Card className="border-none">
                      <CardHeader className="flex flex-row justify-between items-start gap-4">
                        <div className="flex flex-row items-center gap-4">
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
                            <p className="text-sm text-foreground/60">
                              اللون: {item.nameOfColor || "غير متوفر"}
                            </p>
                            <p className="text-sm text-foreground/60">
                              المقاس: {item.sizeName}
                            </p>
                            <p className="text-sm text-foreground/60">
                              السعر: {item.price} دينار
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-left text-2xl">
                          {item.quantity * item.price} دينار
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
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
                            إزالة
                            <Trash />
                          </Button>{" "}
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
                      {/* <CardFooter></CardFooter> */}
                    </Card>
                    <Separator className="my-1" />
                  </Fragment>
                ))}
              </div>
            )}
          </ScrollArea>
          <div className="flex justify-end">
            <Button variant="destructive" onClick={clearCart}>
              إفراغ السلة
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
