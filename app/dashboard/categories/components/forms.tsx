"use client";

import AccessibleDialogForm from "@/components/accible-dialog-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from "../actions";
import { Category } from "@prisma/client";
import { CustomDropzoneUploadImage } from "@/components/custom-dropzone";

export const CreateCategoryForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      title="إضافة تصنيف جديد"
      submit="إضافة"
      action={createCategoryAction}
      trigger={<Button>إضافة تصنيف جديد</Button>}
    >
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">اسم التصنيف</Label>
          <Input
            id="title"
            name="title"
            placeholder="أدخل اسم التصنيف"
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">المُعرف (Slug)</Label>
          <Input
            id="slug"
            name="slug"
            placeholder="أدخل المُعرف الخاص بالتصنيف"
            required
          />
        </div>
        <div>
          <CustomDropzoneUploadImage name="image" title="صورة المنتج" />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const UpdateCategoryForm = ({ category }: { category: Category }) => {
  const [open, setOpen] = useState(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      title="تحديث التصنيف"
      submit="تحديث"
      action={updateCategoryAction}
      trigger={<button>تحديث التصنيف</button>}
    >
      <Input type="hidden" name="id" value={category.id} readOnly />
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">اسم التصنيف</Label>
          <Input
            id="title"
            name="title"
            defaultValue={category.title}
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">المُعرف (Slug)</Label>
          <Input
            id="slug"
            name="slug"
            placeholder="أدخل المُعرف الخاص بالتصنيف"
            required
            defaultValue={category.slug}
          />
        </div>
        <div>
          {/* <Label htmlFor="image">رابط الصورة (اختياري)</Label> */}
          <CustomDropzoneUploadImage
            name="image"
            title="صورة المنتج"
            defaultImage={category?.image}
          />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const DeleteCategoryForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      title="حذف التصنيف"
      submit="حذف"
      submitVariant="destructive"
      discardVariant="default"
      action={deleteCategoryAction}
      description="هل أنت متأكد من رغبتك في حذف هذا التصنيف؟ لا يمكن التراجع عن هذا الإجراء."
      trigger={<button>حذف التصنيف</button>}
    >
      <Input type="hidden" name="id" value={id} readOnly />
    </AccessibleDialogForm>
  );
};
