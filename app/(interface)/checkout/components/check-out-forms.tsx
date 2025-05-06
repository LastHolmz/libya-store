"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useQueryParam from "@/hooks/use-query-params";
import Form from "@/components/form";
import { OrderItemInput } from "@/types/interfaces";
import { useCart } from "@/context/CartContext";
import ControlledResponsiveDialog from "@/components/controlled-responsive-dialog";
import { FaHandHoldingHeart, FaMinus, FaPlus } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { CustomLink } from "@/components/custom-link";
import { useParams } from "next/navigation";
import { submitOrderAction } from "../actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Props {
  cities: City[];
  subCities: SubCity[];
}

const CheckOutForm = ({ cities, subCities }: Props) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(cities[0]?.id || 0);
  const [subCityId, setSubCityId] = useState<number>(subCities[0]?.id || 0);
  const [open, setOpen] = useState<boolean>(false);
  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const items: OrderItemInput[] = cart.map((item) => ({
    hashedColor: item.hexOfColor ?? "",
    image: item.image,
    nameOfColor: item.nameOfColor ?? "",
    price: item.price,
    productId: item.productId,
    qty: item.quantity,
    skuId: item.colorShcemeId,
    skuImage: item.image,
    title: item.title,
    vanexId: item.vanexId ?? 0,
    nameOfSize: item.sizeName,
  }));

  const { category } = useParams();

  const { setQueryParam, deleteQueryParam } = useQueryParam();

  const handleCityChange = (value: string) => {
    deleteQueryParam(["cityId"]);
    setQueryParam([{ key: "cityId", value }]);
    setCityId(Number(value));
  };

  useEffect(() => {
    setQueryParam([{ key: "cityId", value: cityId.toString() }]);
  }, []);

  useEffect(() => {
    const selectedCity = cities.find((c) => c.id === cityId) || null;
    const selectedSubCity = subCities.find((s) => s.id === subCityId) || null;

    const basePrice = selectedCity?.price || 0;
    const extraPrice = selectedSubCity?.price || 0;

    if (extraPrice) {
      setDeliveryCost(extraPrice);
    } else {
      setDeliveryCost(basePrice);
    }
  }, [cityId, subCityId, cities, subCities]);

  useEffect(() => {
    setQuantity(items.reduce((acc, item) => acc + item.qty, 0));
  }, [items, cart, quantity]);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const total = subtotal + deliveryCost;

  return (
    <>
      <ControlledResponsiveDialog
        footer={false}
        open={open}
        description="معلومات الطلب"
        setOpen={setOpen}
      >
        <div className="py-10 px-4 text-center">
          <h4 className="font-semibold">شكرا لإختيارك خدماتنا</h4>
          <p className="text-foreground/80 text-sm mt-2">
            سيتم الإتصال بك قريبا لتأكيد طلبك
          </p>
          <div className="w-fit mx-auto text-center flex-center-row my-4">
            <FaHandHoldingHeart size={56} color="red" />
          </div>
          <div className="flex-between-row gap-2">
            {" "}
            <CustomLink
              variant={"default"}
              href={"/"}
              className={cn("w-full my-2")}
            >
              الرئيسية
            </CustomLink>
            <CustomLink
              variant={"outline"}
              href={`/categories/${category}`}
              className={cn("w-full my-2")}
            >
              منتجات مشابهة
            </CustomLink>
          </div>
        </div>
      </ControlledResponsiveDialog>
      <Form
        dontReplace
        success="تم إنشاء الطلب بنجاح."
        onSuccessEvent={() => {
          setOpen(!open);
          clearCart();
        }}
        action={submitOrderAction}
        submitClass="md:max-w-sm mt-2"
        submitText="تأكيد الطلب"
        className="bg-secondary rounded-3xl shadow-lg min-h-[75vh] my-10 md:w-[75%] mx-auto grid grid-cols-2 phone-only:w-[95%] phone-only:grid-cols-1 py-10 px-4"
      >
        <div>
          <Input type="hidden" name="qty" value={quantity} />
          <Input type="hidden" name="items" value={JSON.stringify(items)} />
          <Input type="hidden" name="itemsPrice" value={subtotal} />
          <Input type="hidden" name="deliveryPrice" value={deliveryCost} />

          <div className="grid gap-5">
            <div>
              <Label htmlFor="fullName">اسمك</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="أدخل اسمك"
                required
                className="max-w-sm dark:border-foreground/20"
              />
              <span className="text-xs text-foreground/80 mt-1">
                ادخل اسمك هنا
              </span>
            </div>

            <div>
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="أدخل رقم الهاتف"
                required
                className="max-w-sm dark:border-foreground/20"
              />
              <span className="text-xs text-foreground/80 mt-1">
                ادخل رقم الهاتف هنا
              </span>
            </div>

            <div>
              <Label htmlFor="phone_b">(اختياري) رقم الهاتف الاحتياطي</Label>
              <Input
                id="phone_b"
                name="phone_b"
                placeholder="أدخل رقم الهاتف الاحتياطي"
                className="max-w-sm dark:border-foreground/20"
              />
              <span className="text-xs text-foreground/80 mt-1">
                ادخل رقم الهاتف الاحتياطي هنا
              </span>
            </div>

            <div>
              <Label htmlFor="address">موقعك</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="أدخل موقعك"
                required
                className="max-w-sm dark:border-foreground/20"
              />
              <span className="text-xs text-foreground/80 mt-1">
                ادخل موقعك هنا
              </span>
            </div>

            <div>
              <Label htmlFor="city">اختر المدينة</Label>
              <Select
                onValueChange={handleCityChange}
                value={cityId.toString()}
                dir="rtl"
                name="city"
              >
                <SelectTrigger
                  id="city"
                  className="md:max-w-sm dark:border-foreground/20"
                >
                  <SelectValue placeholder="المدن" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      <div className="flex justify-between w-full items-center">
                        <span>{c.name}</span>
                        {"  -  "}
                        <span>{c.price} د</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {subCities.length > 0 && (
              <div>
                <Label htmlFor="subCity">اختر المنطقة</Label>
                <Select
                  value={subCityId.toString()}
                  onValueChange={(v) => setSubCityId(Number(v))}
                  dir="rtl"
                  name="subCity"
                >
                  <SelectTrigger
                    id="subCity"
                    className="md:max-w-sm dark:border-foreground/20"
                  >
                    <SelectValue placeholder="المناطق" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCities.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        <div className="flex justify-between w-full items-center">
                          <span>{s.name}</span>
                          {"  -  "}
                          <span>{s.price} د</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="map">(اختياري) رابط خريطة قوقل</Label>
              <Input
                id="map"
                name="map"
                placeholder="أدخل رابط خريطة قوقل"
                className="max-w-sm dark:border-foreground/20"
              />
              <span className="text-xs text-foreground/80 mt-1">
                ادخل رابط خريطة قوقل هنا
              </span>
            </div>
          </div>
        </div>

        <div className="phone-only:mt-10">
          <ScrollArea dir="rtl" className="h-[65vh]">
            {cart.length === 0 ? (
              <p>سلتك فارغة.</p>
            ) : (
              <div className="grid gap-2">
                {cart.map((item, index) => (
                  <Fragment key={index}>
                    <Card className="border-none bg-transparent shadow-none">
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
                        <div className="flex h-full flex-col justify-between items-end gap-3">
                          <p className="font-bold text-left text-2xl">
                            {item.quantity * item.price} دينار
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                item.quantity <= 1
                                  ? removeFromCart(
                                      item.productId,
                                      item.colorShcemeId,
                                      item.sizeId
                                    )
                                  : updateQuantity(
                                      item.productId,
                                      item.colorShcemeId,
                                      item.sizeId,
                                      item.quantity - 1
                                    );
                              }}
                              // disabled={item.quantity <= 1}
                            >
                              {item.quantity <= 1 ? <Trash /> : <FaMinus />}
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.colorShcemeId,
                                  item.sizeId,
                                  item.quantity + 1
                                )
                              }
                            >
                              <FaPlus />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      {/* <CardContent className="max-h-0"></CardContent> */}
                    </Card>
                    <Separator className="my-1" />
                  </Fragment>
                ))}
              </div>
            )}
          </ScrollArea>
          <div className="grid gap-5 mt-5">
            {/* <h1 className="text-2xl font-bold">{product.title}</h1> */}
            {/* <p className="text-lg">السعر: {product.price} دينار</p> */}
            <p className="text-lg">الكمية: {quantity}</p>
            {/* <p className="text-lg">اللون: {productColor?.name}</p>
            <p className="text-lg">المقاس: {productSize?.title}</p> */}
            <p className="text-lg">سعر التوصيل: {deliveryCost} دينار</p>
            <p className="text-lg font-bold">
              المجموع: {subtotal} + {deliveryCost} = {total} دينار
            </p>
          </div>
          <Input type="hidden" name="totalPrice" value={total} />
        </div>
      </Form>
    </>
  );
};

export default CheckOutForm;
