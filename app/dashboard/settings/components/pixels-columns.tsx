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
import { Pixel } from "@prisma/client";
import { DeletePixelForm, UpdatePixelForm } from "./forms";

export const pixelsTable: ColumnDef<Pixel>[] = [
  {
    accessorKey: "الاسم",
    header: "الاسم",
    cell: ({ row }) => {
      const title = row.original?.title;
      return <div>{title || "لايوجد"}</div>;
    },
  },
  {
    accessorKey: "القيمة",
    header: "القيمة",
    cell: ({ row }) => {
      const value = row.original?.value;
      return <div dir="ltr">{value || "لايوجد"}</div>;
    },
  },
  {
    accessorKey: "عدد المنتجات",
    header: "عدد المنتجات",
    cell: ({ row }) => {
      const count = (row.original as any)?._count?.Product;
      return <div>{count ?? "لايوجد"}</div>;
    },
  },
  {
    id: "actions",
    header: "الأحداث",
    enableHiding: false,
    cell: ({ row }) => {
      const pixel = row.original;
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <UpdatePixelForm pixel={pixel} />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeletePixelForm id={pixel.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
