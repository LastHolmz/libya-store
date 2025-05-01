"use client";

import AccessibleDialogForm from "@/components/accible-dialog-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  createPixelAction,
  updatePixelAction,
  deletePixelAction,
} from "../actions";
import { Pixel } from "@prisma/client";

export const CreatePixelForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      title="إضافة بكسل جديد"
      submit="إضافة"
      action={createPixelAction}
      trigger={<Button>إضافة بكسل جديد</Button>}
    >
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">عنوان البكسل</Label>
          <Input
            id="title"
            name="title"
            placeholder="أدخل عنوان البكسل"
            required
          />
        </div>
        <div>
          <Label htmlFor="value">قيمة البكسل</Label>
          <Input
            id="value"
            name="value"
            placeholder="أدخل الكود أو القيمة"
            required
          />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const UpdatePixelForm = ({ pixel }: { pixel: Pixel }) => {
  const [open, setOpen] = useState(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      title="تحديث البكسل"
      submit="تحديث"
      action={updatePixelAction}
      trigger={<button>تحديث البكسل</button>}
    >
      <Input type="hidden" name="id" value={pixel.id} readOnly />
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">عنوان البكسل</Label>
          <Input id="title" name="title" defaultValue={pixel.title} required />
        </div>
        <div>
          <Label htmlFor="value">قيمة البكسل</Label>
          <Input id="value" name="value" defaultValue={pixel.value} required />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const DeletePixelForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      title="حذف البكسل"
      submit="حذف"
      submitVariant="destructive"
      discardVariant="default"
      action={deletePixelAction}
      description="هل أنت متأكد من رغبتك في حذف هذا البكسل؟ لا يمكن التراجع عن هذا الإجراء."
      trigger={<button>حذف البكسل</button>}
    >
      <Input type="hidden" name="id" value={id} readOnly />
    </AccessibleDialogForm>
  );
};
