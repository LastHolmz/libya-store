import { cn } from "@/lib/utils";
import React from "react";

const NotFoundTable = ({
  title = "",
  className,
}: {
  title?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded px-2 py-0.5 text-center bg-red-400 w-1/2 ml-auto ",
        title.length > 1 && "bg-red-200 text-red-700",
        className
      )}
    >
      {title}
    </div>
  );
};

export default NotFoundTable;
