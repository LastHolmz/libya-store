"use client";

import { useEffect, useState } from "react";
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
import { Product } from "@prisma/client";
import Form from "@/components/form";
import { submitOrderAction } from "../checking-out/actions";
import { OrderItemInput } from "@/types/interfaces";
import { useCart } from "@/context/CartContext";
import ControlledResponsiveDialog from "@/components/controlled-responsive-dialog";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Link } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomLink } from "@/components/custom-link";
import { useParams } from "next/navigation";

interface Props {
  product: Product & {
    colorShcemes: {
      name: string | null;
      id: string;
      image: string | null;
      sizes: {
        id: string;
        title: string | null;
        qty: number;
        colorShcemeId: string | null;
      }[];
      color: string | null;
      vanexId: number | null;
    }[];
  };
  qty: number;
  productColor?: {
    name: string | null;
    id: string;
    image: string | null;
    sizes: {
      id: string;
      title: string | null;
      qty: number;
      colorShcemeId: string | null;
    }[];
    color: string | null;
    vanexId: number | null;
  };
  productSize?: {
    id: string;
    title: string | null;
    qty: number;
    colorShcemeId: string | null;
  };
  cities: City[];
  subCities: SubCity[];
  // items: OrderItemInput[];
}

const CheckOutForm = ({
  product,
  qty,
  productColor,
  productSize,
  cities,
  subCities,
}: Props) => {
  const [quantity, setQuantity] = useState<number>(qty);
  const [cityId, setCityId] = useState<number>(cities[0]?.id || 0);
  const [subCityId, setSubCityId] = useState<number>(subCities[0]?.id || 0);
  const [open, setOpen] = useState<boolean>(false);
  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  const { cart } = useCart();

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
    nameOfSize: item.nameOfSize ?? "",
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

  const subtotal = product.price * quantity;
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
        onSuccessEvent={() => setOpen(!open)}
        action={submitOrderAction}
        submitClass="md:max-w-sm mt-2"
        submitText="تأكيد الطلب"
        className="bg-secondary rounded-3xl shadow-lg min-h-[75vh] my-10 md:w-[75%] mx-auto grid grid-cols-2 phone-only:grid-cols-1 py-10 px-4"
      >
        <div>
          <Input type="hidden" name="qty" value={quantity} />
          <Input type="hidden" name="itemsPrice" value={subtotal} />
          <Input type="hidden" name="deliveryPrice" value={deliveryCost} />
          <Input type="hidden" name="items" value={JSON.stringify(items)} />
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

            <div>
              <Label htmlFor="qty">تعديل الكمية</Label>
              <Input
                id="qty"
                name="qty"
                type="number"
                min={1}
                max={productSize?.qty || 10}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(
                      1,
                      Math.min(Number(e.target.value), productSize?.qty || 10)
                    )
                  )
                }
                placeholder="يمكنك تعديل الكمية هنا"
                className="max-w-sm dark:border-foreground/20"
              />
              <span className="text-xs text-foreground/80 mt-1">
                ادخل الكمية هنا
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="max-h-80 max-w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded-tl-3xl rounded-tr-3xl"
            />
          </div>

          <div className="grid gap-5 mt-5">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-lg">السعر: {product.price} دينار</p>
            <p className="text-lg">الكمية: {quantity}</p>
            <p className="text-lg">اللون: {productColor?.name}</p>
            <p className="text-lg">المقاس: {productSize?.title}</p>
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
