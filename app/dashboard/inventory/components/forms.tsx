"use client";

import AccessibleDialogForm from "@/components/accible-dialog-form";
import { Category, Extension, Product } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Fragment, ReactNode, useState } from "react";
import {
  addColorToProductAction,
  addDescriptionProductAction,
  addExtensionToProductAction,
  createProductAction,
  deleteColorOfProductAction,
  deleteExtensionOfProductAction,
  updateColorOfProductAction,
  updateConfigAction,
  updateExtensionOfProductAction,
} from "../actions";
import { CustomDropzoneUploadImage } from "@/components/custom-dropzone";
import { Textarea } from "@/components/ui/textarea";
import { FaPlus, FaTrash } from "react-icons/fa6";
import React from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Pencil, Trash } from "lucide-react";
import { ResponsiveDialogWithCustomOpenFuncionality } from "@/components/responsive-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import uri from "@/lib/uri";
import Form from "@/components/form";
import Editor from "@/components/rich-text-editor";
import { Switch } from "@/components/ui/switch";

export const CreateProductForm = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="إنشاء"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button>إضافة منتج جديد</Button>}
      action={createProductAction}
      title="إضافة منتج جديد"
    >
      <div className="grid gap-4">
        <CustomDropzoneUploadImage name="image" title="صورة المنتج" />
        {categories.length > 0 && (
          <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
            <Label htmlFor="categoryId">الأصناف</Label>
            <Select name="categoryId" dir="rtl" defaultValue={categories[0].id}>
              <SelectTrigger id="categoryId" className="md:w-[180px] w-full">
                <SelectValue placeholder="حدد الأصناف" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div>
          <Label htmlFor="title">اسم المنتج</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="أدخل اسم المنتج"
            required
          />
        </div>
        <div>
          <Label htmlFor="originalPrice">السعر الأصلي</Label>
          <Input
            type="number"
            name="originalPrice"
            id="originalPrice"
            placeholder="أدخل السعر الأصلي"
            required
            dir="rtl"
          />
        </div>
        <div>
          <Label htmlFor="price">سعر البيع</Label>
          <Input
            type="number"
            name="price"
            id="price"
            placeholder="أدخل سعر البيع"
            required
            dir="rtl"
          />
        </div>
        <div>
          <Label htmlFor="description">وصف المنتج</Label>
          <Textarea
            name="description"
            id="description"
            placeholder="أدخل وصف المنتج"
            required
            dir="rtl"
          />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const AddColorsToProductForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [sizes, setSizes] = useState<{ title: string; qty: number }[]>([]);

  const qtyRef = React.useRef<HTMLInputElement>(null);
  const titleRef = React.useRef<HTMLInputElement>(null);

  const addToSizes = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      setSizes([...sizes, { title, qty }]);
      setTitle("");
      setQty(0);
      if (titleRef.current) {
        titleRef.current.focus();
      }
    }
  };

  const handleDeleteSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };
  return (
    <AccessibleDialogForm
      submit="إنشاء"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={
        <Button size={"icon"} className="mx-1">
          <FaPlus />
        </Button>
      }
      action={addColorToProductAction}
      title="إضافة لون و احجامه"
      wide={true}
    >
      <Input type="hidden" name="sizes" value={JSON.stringify(sizes)} />
      <Input type="hidden" name="productId" value={id} />
      <div className="md:flex flex-row-reverse justify-between w-full gap-4">
        <CustomDropzoneUploadImage name="image" title="صورة المنتج" />
        <div className="grid gap-4 w-full phone-only:mt-4">
          <div>
            <Label htmlFor="name">اسم اللون</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="أدخل اسم اللون"
              required
              dir="rtl"
            />
          </div>
          <div>
            <Label htmlFor="color">اختر اللون</Label>
            <Input
              type="color"
              name="color"
              id="color"
              placeholder="أدخل اختر اللون"
              required
              dir="rtl"
            />
          </div>
          <div>
            <Label htmlFor="sizes">المقاسات</Label>
            <div className="border-foreground/40 border rounded-md p-2 ">
              <div className="grid  grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="sizes" className="text-xs">
                    اسم المقاس
                  </Label>
                  <Input
                    id="sizes"
                    placeholder="اسم المقاس"
                    ref={titleRef}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        qtyRef.current?.focus();
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="qty" className="text-xs">
                    الكمية
                  </Label>
                  <Input
                    id="qty"
                    placeholder="الكمية"
                    ref={qtyRef}
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                    onKeyDown={addToSizes}
                  />
                </div>
              </div>
              {sizes.length > 0 && (
                <div className="grid gap-2 py-2">
                  {sizes.map((size, index) => (
                    <Fragment key={index}>
                      <div className="grid relative text-center hover:bg-accent rounded py-1 grid-cols-2">
                        <span>{size.title}</span>
                        <span>{size.qty}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteSize(index)}
                          className="absolute transform -translate-y-1/2 text-red-500 hover:text-red-400 top-1/2 left-0 flex items-center justify-center h-6 w-6 py-1"
                        >
                          <span className="sr-only">حذف</span>
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};
export const UpdateColorsOfProductForm = ({
  colorShceme,
}: {
  colorShceme: {
    id: string;
    color: string | null;
    name: string | null;
    image: string | null;

    sizes: {
      id: string;
      title: string | null;
      qty: number;
      colorShcemeId: string | null;
    }[];
  };
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [sizes, setSizes] = useState<{ title: string | null; qty: number }[]>(
    colorShceme.sizes.map((size) => ({
      title: size.title,
      qty: size.qty,
    }))
  );

  const qtyRef = React.useRef<HTMLInputElement>(null);
  const titleRef = React.useRef<HTMLInputElement>(null);

  const addToSizes = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      setSizes([...sizes, { title, qty }]);
      setTitle("");
      setQty(0);
      if (titleRef.current) {
        titleRef.current.focus();
      }
    }
  };

  const handleDeleteSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };
  return (
    <AccessibleDialogForm
      submit="تحديث"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={
        <button className="hidden group-hover:block">
          <Pencil1Icon />
        </button>
      }
      action={updateColorOfProductAction}
      title="تحديث لون و احجامه"
      wide={true}
    >
      <Input type="hidden" name="sizes" value={JSON.stringify(sizes)} />
      <Input type="hidden" name="id" value={colorShceme.id} />
      <div className="md:flex flex-row-reverse justify-between w-full gap-4">
        <CustomDropzoneUploadImage
          defaultImage={colorShceme.image}
          name="image"
          title="صورة المنتج"
        />
        <div className="grid gap-4 w-full phone-only:mt-4">
          <div>
            <Label htmlFor="name">اسم اللون</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="أدخل اسم اللون"
              required
              dir="rtl"
              defaultValue={colorShceme.name ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="color">اختر اللون</Label>
            <Input
              type="color"
              name="color"
              id="color"
              placeholder="أدخل اختر اللون"
              required
              dir="rtl"
              defaultValue={colorShceme.color ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="sizes">المقاسات</Label>
            <div className="border-foreground/40 border rounded-md p-2 ">
              <div className="grid  grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="sizes" className="text-xs">
                    اسم المقاس
                  </Label>
                  <Input
                    id="sizes"
                    placeholder="اسم المقاس"
                    ref={titleRef}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        qtyRef.current?.focus();
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="qty" className="text-xs">
                    الكمية
                  </Label>
                  <Input
                    id="qty"
                    placeholder="الكمية"
                    ref={qtyRef}
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                    onKeyDown={addToSizes}
                  />
                </div>
              </div>
              {sizes.length > 0 && (
                <div className="grid gap-2 py-2">
                  {sizes.map((size, index) => (
                    <Fragment key={index}>
                      <div className="grid relative text-center hover:bg-accent rounded py-1 grid-cols-2">
                        <span>{size.title}</span>
                        <span>{size.qty}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteSize(index)}
                          className="absolute transform -translate-y-1/2 text-red-500 hover:text-red-400 top-1/2 left-0 flex items-center justify-center h-6 w-6 py-1"
                        >
                          <span className="sr-only">حذف</span>
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};
export const DeleteColorsOfProductForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="حذف"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={
        <button className="hidden group-hover:block">
          <Trash size={16} />
        </button>
      }
      action={deleteColorOfProductAction}
      title="حذف لون"
      description="هل انت متأكد من حذف اللون لا يمكن استرداده ثانية؟"
    >
      <Input type="hidden" name="id" value={id} />
    </AccessibleDialogForm>
  );
};
export const AddExtensionToProductForm = ({
  id,
  trigger = (
    <Button className="mx-1 absolute top-0 left-0">
      <FaPlus className="w-4 h-4 ml-2" /> اضف
    </Button>
  ),
}: {
  id: string;
  trigger?: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AccessibleDialogForm
      submit="إنشاء"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={trigger}
      action={addExtensionToProductAction}
      title="إضافة اضافات"
    >
      <Input type="hidden" name="productId" value={id} />
      <div className="flex-col flex justify-between w-full gap-4">
        <CustomDropzoneUploadImage name="image" title="صورة إضافة" />
        <div className="grid gap-4 w-full phone-only:mt-4">
          <div>
            <Label htmlFor="title">اسم الإضافة</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="أدخل اسم الإضافة"
              required
              dir="rtl"
            />
          </div>
          <div>
            <Label htmlFor="price">ادخل السعر</Label>
            <Input
              type="number"
              name="price"
              id="price"
              placeholder="أدخل ادخل السعر"
              required
              dir="rtl"
            />
          </div>
          <div>
            <Label htmlFor="qty">ادخل الكمية</Label>
            <Input
              type="number"
              name="qty"
              id="qty"
              placeholder="أدخل ادخل الكمية"
              required
              dir="rtl"
            />
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};
export const UpdateExtensionOfProductForm = ({
  id,
  image,
  price,
  productId,
  title,
  qty,
  trigger = (
    <Button
      size={"icon"}
      variant={"outline"}
      className="transition-all duration-500 hidden group-hover:flex"
    >
      <Pencil className="w-4 h-4" />
    </Button>
  ),
}: Extension & {
  trigger?: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AccessibleDialogForm
      submit="تحديث"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={trigger}
      action={updateExtensionOfProductAction}
      title="إضافة اضافات"
    >
      <Input type="hidden" name="id" value={id} />
      <Input type="hidden" name="productId" value={productId} />
      <div className="flex-col flex justify-between w-full gap-4">
        <CustomDropzoneUploadImage
          name="image"
          defaultImage={image}
          title="صورة إضافة"
        />
        <div className="grid gap-4 w-full phone-only:mt-4">
          <div>
            <Label htmlFor="title">اسم الإضافة</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="أدخل اسم الإضافة"
              required
              dir="rtl"
              defaultValue={title ?? undefined}
            />
          </div>
          <div>
            <Label htmlFor="price">ادخل السعر</Label>
            <Input
              type="number"
              name="price"
              id="price"
              placeholder="أدخل ادخل السعر"
              required
              dir="rtl"
              defaultValue={price ?? undefined}
            />
          </div>
          <div>
            <Label htmlFor="qty">ادخل الكمية</Label>
            <Input
              type="number"
              name="qty"
              id="qty"
              placeholder="أدخل ادخل الكمية"
              required
              dir="rtl"
              defaultValue={qty ?? undefined}
            />
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};
export const DeleteExtensionOfProductForm = ({
  id,
  trigger = (
    <Button
      size={"icon"}
      variant={"outline"}
      className="mx-1 transition-all duration-500 hidden group-hover:flex"
    >
      <Trash size={16} />
    </Button>
  ),
}: {
  id: string;
  trigger?: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="حذف"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={trigger}
      action={deleteExtensionOfProductAction}
      title="حذف لون"
      description="هل انت متأكد من حذف الإضافة لا يمكن استرداده ثانية؟"
    >
      <Input type="hidden" name="id" value={id} />
    </AccessibleDialogForm>
  );
};

export const ShareProductForm = ({
  categoryId,
  productId,
}: {
  productId: string;
  categoryId: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [header, setHeader] = useState<boolean>(true);
  const [footer, setFooter] = useState<boolean>(true);
  const [related, setRelated] = useState<boolean>(true);
  const [cart, setCart] = useState<boolean>(true);

  const handleCopyLink = () => {
    const link = `${uri}/categories/${categoryId}/${productId}?header=${header}&footer=${footer}&related=${related}&cart=${cart}`;
    navigator.clipboard.writeText(link);
    toast({
      className: "bg-primary text-white",
      description: "تم نسخ الرابط بنجاح",
    });
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <ResponsiveDialogWithCustomOpenFuncionality
      open={open}
      setOpen={setOpen}
      trigger={<button>مشاركة</button>}
      title="مشاركة المنتج"
      description="اختيار شكل صفحة الهبوط للمنتج"
    >
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <label htmlFor="header" className="text-sm font-medium">
            إظهار رأس الصفحة
          </label>
          <Checkbox
            id="header"
            checked={header}
            onCheckedChange={(checked) => setHeader(checked === true)}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="footer" className="text-sm font-medium">
            إظهار ذيل الصفحة
          </label>
          <Checkbox
            id="footer"
            checked={footer}
            onCheckedChange={(checked) => setFooter(checked === true)}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="related" className="text-sm font-medium">
            إظهار المنتجات الشابهة
          </label>
          <Checkbox
            id="related"
            checked={related}
            onCheckedChange={(checked) => setRelated(checked === true)}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="cart" className="text-sm font-medium">
            إظهار السلة
          </label>
          <Checkbox
            id="cart"
            checked={cart}
            onCheckedChange={(checked) => setCart(checked === true)}
          />
        </div>

        <Button className="w-full" onClick={handleCopyLink}>
          نسخ الرابط
        </Button>
      </div>
    </ResponsiveDialogWithCustomOpenFuncionality>
  );
};

export const AddDescriptionProductForm = ({
  id,
  defaultContent,
}: {
  id: string;
  defaultContent?: string;
}) => {
  const [content, setContent] = useState<string>(defaultContent ?? "");
  return (
    <Form
      success="تم تحديث شرح المنتج"
      replaceLink={`/dashboard/inventory/${id}/description`}
      submit="إضافة"
      action={addDescriptionProductAction}
      dontReplace
    >
      <Input type="hidden" name="id" value={id} />
      <Input type="hidden" name="info" value={content} />
      <Editor content={content} onChange={setContent} />
    </Form>
  );
};

export default function UpdateConfigForm({
  config,
  id,
}: {
  config: {
    selectType: string;
    acceptReviews: boolean;
    fakeRating?: number | null;
    fakeDiscountRation?: number | null;
    fakeRatingSelected: boolean;
  };
  id: string;
}) {
  const [formState, setFormState] = useState(config);

  return (
    <Form
      action={updateConfigAction}
      // success="تم تحديث اعدادات المنتج"
      className="space-y-6 max-w-lg"
      submit="تحديث"
    >
      {/* SelectType */}
      <Input type="hidden" name="id" value={id} />
      <div className="space-y-2" dir="rtl">
        <Label htmlFor="selectType">نوع التحديد</Label>
        <Select dir="rtl" name="selectType" defaultValue={formState.selectType}>
          <SelectTrigger>
            <SelectValue placeholder="اختر النوع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="colors">الالوان</SelectItem>
            <SelectItem value="photos">الصور</SelectItem>
            <SelectItem value="names">الاسماء</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* acceptReviews */}
      <div className="flex items-center justify-between">
        <Label htmlFor="acceptReviews">السماح بالمراجعات</Label>
        <Switch name="acceptReviews" defaultChecked={formState.acceptReviews} />
      </div>

      {/* fakeRating */}
      <div className="space-y-2">
        <Label htmlFor="fakeRating">تقييم مزيف</Label>
        <Input
          type="number"
          name="fakeRating"
          max={5}
          min={0}
          defaultValue={formState.fakeRating ?? ""}
        />
      </div>

      {/* fakeDiscountRation */}
      <div className="space-y-2">
        <Label htmlFor="fakeDiscountRation">نسبة الخصم المزيف</Label>
        <Input
          type="number"
          name="fakeDiscountRation"
          min={0}
          defaultValue={formState.fakeDiscountRation ?? ""}
        />
      </div>

      {/* fakeRatingSelected */}
      <div className="flex items-center justify-between">
        <Label htmlFor="fakeRatingSelected">اختيار التقييم المزيف</Label>
        <Switch
          dir="rtl"
          name="fakeRatingSelected"
          defaultChecked={formState.fakeRatingSelected}
        />
      </div>
    </Form>
  );
}
