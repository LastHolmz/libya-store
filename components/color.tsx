import { cn } from "@/lib/utils";
import { ColorShceme } from "@prisma/client";

const Color = ({
  color,
  name,
  className,
}: Omit<ColorShceme, "productId"> & { className?: string }) => {
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
    </div>
  );
};

export default Color;
