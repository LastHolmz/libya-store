"use client";
import AccessibleDialogForm from "@/components/accible-dialog-form";
import { useState } from "react";
import { createCategoryAction } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomDropzoneUploadImage } from "@/components/custom-dropzone";
import { Button } from "@/components/ui/button";

export const CreateCategory = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="إنشاء"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button>إضافة صنف جديد</Button>}
      action={createCategoryAction}
      title="إضافة صنف جديد"
    >
      <div className="grid gap-4">
        <CustomDropzoneUploadImage name="image" title="صورة الصنف" />
        <div>
          <Label htmlFor="title">اسم الصنف</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="أدخل اسم الصنف"
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">المعرف الفريد</Label>
          <Input
            type="text"
            name="slug"
            id="slug"
            placeholder="ادخل المعرف الفريد"
            required
          />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};
