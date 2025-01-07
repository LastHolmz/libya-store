import { cn } from "@/lib/utils";
import { ColorShceme } from "@prisma/client";
import { ReactNode } from "react";

const Color = ({
  color,
  name,
  className,
  children,
}: Omit<ColorShceme, "productId"> & {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      style={{
        backgroundColor: color ?? "#000",
      }}
      className={cn(
        color
          ? "rounded-full min-w-4 min-h-4"
          : "w-fit rounded-md border border-foreground/20",
        className
      )}
    >
      {!color && name}
      {children}
    </div>
  );
};

export default Color;
