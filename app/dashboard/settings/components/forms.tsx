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
  createTokenAction,
} from "../actions";
import { Pixel } from "@prisma/client";
import { Eye, EyeOff } from "lucide-react";

export const CreatePixelForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      title="إضافة بكسل جديد"
      submit="إضافة"
      action={createPixelAction}
      trigger={<Button>بكسل جديد</Button>}
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
export const AssignNewTokenForm = () => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      title="اضافة توكن جديد"
      submit="إنشاء"
      // submitVariant="destructive"
      discardVariant="destructive"
      action={createTokenAction}
      description="هل أنت متأكد من رغبتك في انشاء توكن جديد؟"
      trigger={<Button variant={"outline"}>توكن جديد</Button>}
    >
      <div className="grid gap-4 mb-2">
        <div>
          <Label htmlFor="email">عنوان البريد</Label>
          <Input
            id="email"
            name="email"
            placeholder="أدخل عنوان البريد"
            required
            type="email"
          />
        </div>
        <div className="w-96 mx-auto">
          <Label htmlFor="pass" className="text-sm font-normal">
            كلمة السر
          </Label>
          <div className="relative mt-1">
            <Input
              type={isVisible ? "text" : "password"}
              id="pass"
              name="password"
              placeholder="ادخل كلمة السر"
              className="bg-background w-full"
            />
            <div
              className="absolute top-2 left-4 text-2xl text-gray-500 cursor-pointer"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              {isVisible ? <Eye size={22} /> : <EyeOff size={22} />}
            </div>
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};
