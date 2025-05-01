"use client";

import AccessibleDialogForm from "@/components/accible-dialog-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  // createOrderAction,
  updateOrderAction,
  deleteOrderAction,
} from "../actions";
import { Order, OrderItem } from "@prisma/client";
import { CustomDropzoneUploadImage } from "@/components/custom-dropzone";
import { Select } from "@/components/ui/select";

// export const CreateOrderForm = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <AccessibleDialogForm
//       open={open}
//       setOpen={setOpen}
//       title="إضافة طلب جديد"
//       submit="إضافة"
//       action={createOrderAction}
//       trigger={<Button>إضافة طلب جديد</Button>}
//     >
//       <div className="grid gap-4">
//         <div>
//           <Label htmlFor="phone">رقم الهاتف</Label>
//           <Input
//             id="phone"
//             name="phone"
//             placeholder="أدخل رقم الهاتف"
//             required
//           />
//         </div>
//         <div>
//           <Label htmlFor="phoneB">رقم الهاتف الثاني (اختياري)</Label>
//           <Input
//             id="phoneB"
//             name="phoneB"
//             placeholder="أدخل رقم الهاتف الثاني"
//           />
//         </div>
//         <div>
//           <Label htmlFor="address">العنوان</Label>
//           <Input
//             id="address"
//             name="address"
//             placeholder="أدخل العنوان"
//             required
//           />
//         </div>
//         <div>
//           <Label htmlFor="cityId">المدينة</Label>
//           <Select name="cityId" required>
//             {/* Add city options here */}
//           </Select>
//         </div>
//         <div>
//           <Label htmlFor="subCityId">الحي</Label>
//           <Select name="subCityId" required>
//             {/* Add sub-city options here */}
//           </Select>
//         </div>
//         <div>
//           <Label htmlFor="totalPrice">إجمالي السعر</Label>
//           <Input
//             type="number"
//             id="totalPrice"
//             name="totalPrice"
//             placeholder="أدخل إجمالي السعر"
//             required
//           />
//         </div>
//         <div>
//           <Label htmlFor="status">الحالة</Label>
//           {/* <Select id="status" name="status" required>
//             {Object.values(OrderStatus).map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
//           </Select> */}
//         </div>
//         <div>
//           <Label htmlFor="barcode">الباركود</Label>
//           <Input
//             id="barcode"
//             name="barcode"
//             placeholder="أدخل الباركود"
//             required
//           />
//         </div>
//         <div>
//           <Label htmlFor="map">رابط الخريطة (اختياري)</Label>
//           <Input id="map" name="map" placeholder="أدخل رابط الخريطة" />
//         </div>
//       </div>
//     </AccessibleDialogForm>
//   );
// };

export const UpdateOrderForm = ({ order }: { order: Order }) => {
  const [open, setOpen] = useState(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      title="تحديث الطلب"
      submit="تحديث"
      action={updateOrderAction}
      trigger={<button>تحديث الطلب</button>}
    >
      <Input type="hidden" name="id" value={order.id} readOnly />
      <div className="grid gap-4">
        <div>
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={order.phone}
            placeholder="أدخل رقم الهاتف"
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneB">رقم الهاتف الثاني (اختياري)</Label>
          <Input
            id="phoneB"
            name="phoneB"
            defaultValue={order.phoneB || ""}
            placeholder="أدخل رقم الهاتف الثاني"
          />
        </div>
        <div>
          <Label htmlFor="address">العنوان</Label>
          <Input
            id="address"
            name="address"
            defaultValue={order.address}
            placeholder="أدخل العنوان"
            required
          />
        </div>
        <div>
          <Label htmlFor="cityId">المدينة</Label>
          <Select
            // id="cityId"
            name="cityId"
            // defaultValue={order.cityId.toString()}
            required
          >
            {/* Add city options here */}
          </Select>
        </div>
        <div>
          <Label htmlFor="subCityId">الحي</Label>
          <Select
            name="subCityId"
            // id="subCityId"
            // defaultValue={order.subCityId.toString()}
            required
          >
            {/* Add sub-city options here */}
          </Select>
        </div>
        <div>
          <Label htmlFor="totalPrice">إجمالي السعر</Label>
          <Input
            type="number"
            id="totalPrice"
            name="totalPrice"
            defaultValue={order.totalPrice}
            placeholder="أدخل إجمالي السعر"
            required
          />
        </div>
        <div>
          <Label htmlFor="status">الحالة</Label>
          <Select
            name="status"
            // id="status"
            // defaultValue={order.status}
            required
          >
            {/* {Object.values(OrderStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))} */}
          </Select>
        </div>
        <div>
          <Label htmlFor="barcode">الباركود</Label>
          <Input
            id="barcode"
            name="barcode"
            defaultValue={order.barcode}
            placeholder="أدخل الباركود"
            required
          />
        </div>
        <div>
          <Label htmlFor="map">رابط الخريطة (اختياري)</Label>
          <Input
            id="map"
            name="map"
            defaultValue={order.map || ""}
            placeholder="أدخل رابط الخريطة"
          />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const DeleteOrderForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      title="حذف الطلب"
      submit="حذف"
      submitVariant="destructive"
      discardVariant="default"
      action={deleteOrderAction}
      description="هل أنت متأكد من رغبتك في حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء."
      trigger={<button>حذف الطلب</button>}
    >
      <Input type="hidden" name="id" value={id} readOnly />
    </AccessibleDialogForm>
  );
};
