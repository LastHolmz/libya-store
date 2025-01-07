"use client";
import React, { ReactNode } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
interface Props {
  children?: ReactNode;
  trigger: ReactNode;
  title?: string;
  description?: string;
  footer?: boolean;
}
export default function ResponsiveDialog({
  children,
  trigger,
  description,
  title,
  footer = true,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="px-2">
        <DrawerHeader>
          {title && <DrawerTitle>{title}</DrawerTitle>}
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children}
        {footer && (
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                تجاهل{" "}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
export function ResponsiveDialogWithCustomOpenFuncionality({
  children,
  trigger,
  description,
  title,
  open,
  setOpen,
  wide = false,
}: Props & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  wide?: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          dir={"rtl"}
          className={cn(
            "sm:max-w-[425px] px-4 py-8",
            wide && "lg:w-1/2 lg:max-w-[50%]"
          )}
        >
          <DialogHeader>
            {title && <DialogTitle dir={"rtl"}>{title}</DialogTitle>}
            {description && (
              <DialogDescription dir={"rtl"}>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent dir={"rtl"} className="px-2 py-1">
        <DrawerHeader className="text-right">
          {title && <DrawerTitle dir={"rtl"}>{title}</DrawerTitle>}
          {description && (
            <DrawerDescription dir={"rtl"}>{description}</DrawerDescription>
          )}
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">تجاهل</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
