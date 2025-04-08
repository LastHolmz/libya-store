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
import NotFoundTable from "@/components/not-found-table";
import Image from "next/image";
import { CategoriesProps } from "@/types/interfaces";
import { DeleteCategoryForm, UpdateCategoryForm } from "./forms";

export const categoriesTable: ColumnDef<CategoriesProps>[] = [
  {
    accessorKey: "صورة الصنف",
    header: "صورة الصنف",
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
    accessorKey: "المعرف الفريد",
    header: "المعرف الفريد",
    cell: ({ row }) => {
      if (row) {
        const slug = row.original?.slug;
        return <div>{slug ?? "لايوجد"}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "عدد المنتجات",
    header: "عدد المنتجات",
    cell: ({ row }) => {
      if (row) {
        const count = row.original?._count.Product;
        return <div>{count ?? "لايوجد"}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },

  {
    id: "actions",
    header: "الأحداث",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;
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
              <UpdateCategoryForm category={category} />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteCategoryForm id={category.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
