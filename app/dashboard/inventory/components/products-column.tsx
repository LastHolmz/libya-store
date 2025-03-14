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
import { toast } from "@/hooks/use-toast";
import { Product } from "@prisma/client";
import NotFoundTable from "@/components/not-found-table";
import Image from "next/image";
import Link from "next/link";
import { ShareProductForm } from "./forms";
export interface Props extends Product {
  category: {
    id: string;
    title: string;
  };
  brands: { id: string; title: string }[];
  extensions: {
    id: string;
    title: string | null;
    price: number;
    image: string | null;
  }[];
  colorShcemes: {
    id: string;
    color: string | null;
    name: string | null;
    sizes: {
      id: string;
      title: string | null;
      qty: number;
      colorShcemeId: string | null;
    }[];
  }[];
  subCategories: { title: string; id: string }[];
}
export const productsTable: ColumnDef<Props>[] = [
  {
    accessorKey: "صورة المنتج",
    header: "صورة المنتج",
    cell: ({ row }) => {
      const image = row.original?.image;
      if (!image) {
        return <NotFoundTable />;
      }
      return (
        <div className="overflow-hidden rounded-md h-12 w-12 aspect-square">
          <Image
            src={image}
            alt={`${row.original.title}-image`}
            width={100}
            height={100}
            className=" w-full h-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "الاسم",
    header: "الاسم",
    cell: ({ row }) => {
      if (row) {
        const title = row.original?.title;
        return <div>{title ?? "لايوجد"}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "السعر الأصلي",
    header: "السعر الأصلي",
    cell: ({ row }) => {
      if (row) {
        const originalPrice = row.original?.originalPrice;
        return <div>{originalPrice} د</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "السعر",
    header: "السعر",
    cell: ({ row }) => {
      if (row) {
        const price = row.original?.price;
        return <div>{price} د</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },

  {
    accessorKey: "الباركود",
    header: "الباركود",
    cell: ({ row }) => {
      if (row) {
        const barcode = row.original?.barcode;
        return <div>{barcode}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "الإضافات",
    header: "الإضافات",
    cell: ({ row }) => {
      if (row) {
        const extensions = row.original?.extensions;
        return <div>{extensions.length}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "الكمية",
    header: "الكمية",
    cell: ({ row }) => {
      if (row) {
        const qty = row.original.colorShcemes.reduce((acc, colorScheme) => {
          return (
            acc +
            colorScheme.sizes.reduce((sizeAcc, size) => sizeAcc + size.qty, 0)
          );
        }, 0);
        return <div>{qty}</div>;
      } else {
        return <div>لايوجد</div>;
      }
    },
  },

  {
    id: "actions",
    header: "الأحداث",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
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
              <ShareProductForm
                categoryId={product.categoryId}
                productId={product.id}
              />{" "}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(String(product.barcode));
                toast({
                  className: "bg-primary text-white",
                  description: "تم نسخ الباركود بنجاح",
                });
              }}
            >
              نسح الباركود
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Link href={`/dashboard/inventory/${product.id}`}>معلومات</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
