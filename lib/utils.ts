import { OrderStatus } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusLabel(status: OrderStatus) {
  switch (status) {
    case "pending":
      return "قيد الانتظار";
    case "inProgress":
      return "قيد المعالجة";
    case "done":
      return "مكتمل";
    case "refused":
      return "ملغي";
    case "rejected":
      return "مرفوض";
    default:
      return "غير معروف";
  }
}
