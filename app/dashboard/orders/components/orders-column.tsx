"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteOrderForm, UpdateOrderForm } from "./forms";
import { OrdersProps } from "@/types/interfaces";
import Link from "next/link";

export function getOrdersTable(
  cities: City[],
  _: SubCity[]
): ColumnDef<OrdersProps>[] {
  return [
    {
      accessorKey: "اسم العميل",
      header: "اسم العميل",
      cell: ({ row }) => {
        const barcode = row.original?.fullName;
        return <div>{barcode || "لايوجد"}</div>;
      },
    },
    {
      accessorKey: "الباركود",
      header: "الباركود",
      cell: ({ row }) => {
        const barcode = row.original?.barcode;
        return <div>{barcode || "لايوجد"}</div>;
      },
    },
    {
      accessorKey: "رقم الهاتف",
      header: "رقم الهاتف",
      cell: ({ row }) => {
        const phone = row.original?.phone;
        return <div>{phone || "لايوجد"}</div>;
      },
    },
    {
      accessorKey: "العنوان",
      header: "العنوان",
      cell: ({ row }) => {
        const address = row.original?.address;
        return <div>{address || "لايوجد"}</div>;
      },
    },
    {
      accessorKey: "المدينة",
      header: "المدينة",
      cell: ({ row }) => {
        const cityId = row.original?.cityId;
        const city = cities.find((city) => city.id === cityId);
        return <div>{city?.name || "لايوجد"}</div>;
      },
    },

    {
      accessorKey: "إجمالي السعر",
      header: "إجمالي السعر",
      cell: ({ row }) => {
        const totalPrice = row.original?.totalPrice;
        return <div>{totalPrice.toLocaleString()} د.ل</div>;
      },
    },
    {
      accessorKey: "الحالة",
      header: "الحالة",
      cell: ({ row }) => {
        const status = row.original?.status;
        const statusText: Record<string, string> = {
          pending: "قيد الانتظار",
          inProgress: "قيد التنفيذ",
          done: "تم التوصيل",
          rejected: "مرفوض",
          refused: "مرفوض من العميل",
        };
        return <div>{statusText[status] ?? "غير معروف"}</div>;
      },
    },
    {
      accessorKey: "عدد العناصر",
      header: "عدد العناصر",
      cell: ({ row }) => {
        const count = row.original?.orderItems?.length || 0;
        return <div>{count}</div>;
      },
    },
    {
      id: "actions",
      header: "الأحداث",
      enableHiding: false,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">افتح الأحداث</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>الأحداث</DropdownMenuLabel>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Link href={`/dashboard/orders/${order.id}`}>تفاصيل</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <UpdateOrderForm order={order} />
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <DeleteOrderForm id={order.id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
