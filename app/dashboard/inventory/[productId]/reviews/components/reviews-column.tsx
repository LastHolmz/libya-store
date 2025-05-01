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
import { Review } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UpdateReviewForm } from "@/app/(interface)/categories/[category]/[product]/(landing-page)/components/forms";

export const reviewsTable: ColumnDef<Review>[] = [
  {
    accessorKey: "الاسم",
    header: "الاسم",
    cell: ({ row }) => {
      const fullName = row.original?.fullName;
      return <div>{fullName || "لايوجد"}</div>;
    },
  },

  {
    accessorKey: "عدد النجوم",
    header: "عدد النجوم",
    cell: ({ row }) => {
      const address = row.original?.rating;
      return <div>{address || "لايوجد"}</div>;
    },
  },
  {
    accessorKey: "التعليق",
    header: "التعليق",
    cell: ({ row }) => {
      const comment = row.original?.comment;
      return (
        <div>
          <Popover>
            <PopoverTrigger>{comment?.slice(0, 20)}...</PopoverTrigger>
            <PopoverContent>{comment}</PopoverContent>
          </Popover>
        </div>
      );
    },
  },

  {
    accessorKey: "تم القبول؟",
    header: "تم القبول؟",
    cell: ({ row }) => {
      const accepted = row.original?.accepted;
      return (
        <div>
          {accepted ? (
            <span className="text-green-700 bg-green-300 py-0.5 px-2 rounded-md">
              نعم
            </span>
          ) : (
            <span className="text-red-700 bg-red-300 py-0.5 px-2 rounded-md">
              لا
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "الأحداث",
    enableHiding: false,
    cell: ({ row }) => {
      const review = row.original;
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
              <UpdateReviewForm review={review} />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              {/* <DeleteOrderForm id={review.id} /> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
