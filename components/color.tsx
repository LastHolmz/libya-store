import { cn } from "@/lib/utils";
import { ColorShceme, SelectType } from "@prisma/client";
import Image from "next/image";
import { ReactNode } from "react";

const SelectColor = ({
  className,
  children,
  showType,
  variant,
  ...props
}: Omit<ColorShceme, "productId"> & {
  className?: string;
  children?: ReactNode;
  showType: SelectType;
  variant?: string;
}) => {
  switch (showType) {
    case "colors":
      return <Color {...props} children={children} className={className} />;
    case "photos":
      return <Photo {...props} className={className} />;
    case "names":
      return <Name {...props} className={className} variant={variant} />;
    default:
      return <Color {...props} children={children} className={className} />;
  }
};

const Color = ({
  color,
  className,
  name,
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

const Photo = ({
  className,
  name,
  image,
}: // children,
Omit<ColorShceme, "productId"> & {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        // color
        "bg-secondary overflow-hidden rounded-full  min-h-14 min-w-14",

        className
      )}
    >
      {image && (
        <Image
          src={image}
          alt={name ?? ""}
          // fill={true}
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
      )}
    </div>
  );
};

const Name = ({
  name,
  variant,
}: // children,
Omit<ColorShceme, "productId"> & {
  className?: string;
  variant?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-[62px] transition-all duration-500 flex justify-center items-center px-6 relative overflow-hidden h-9 py-2",
        variant === "default"
          ? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
          : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {name}
    </div>
  );
};

export default SelectColor;
