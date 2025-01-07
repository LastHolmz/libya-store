import { cn } from "@/lib/utils";
import { ColorShceme } from "@prisma/client";

const Color = ({ color, name }: Omit<ColorShceme, "productId">) => {
  return (
    <div
      style={{
        backgroundColor: color ?? "#000",
      }}
      className={cn(
        "",
        color
          ? "rounded-full min-w-4 min-h-4"
          : "w-fit rounded-md border border-foreground/20"
      )}
    >
      {!color && name}
    </div>
  );
};

export default Color;
