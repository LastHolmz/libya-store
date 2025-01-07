"use client";

import Color from "@/components/color";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useQueryParam from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";
import { Size } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdDone } from "react-icons/md";

const ColorSelector = ({
  colors,
}: {
  colors: {
    sizes: Size[];
    name: string | null;
    id: string;
    color: string | null;
    image: string | null;
  }[];
}) => {
  const { setQueryParam } = useQueryParam();
  const [currentColor, setCurrentColor] = useState(
    colors.length > 0 ? colors[0].id : ""
  );

  const searchParams = useSearchParams();
  // const colorId = searchParams.get("colorId");
  const setColor = (color: string) => {
    setCurrentColor(color);
    setQueryParam([{ key: "colorId", value: currentColor }]);
  };
  return (
    <div className="grid gap-4 text-start w-full">
      <Separator className="bg-foreground/20 my-2" />
      <Label>اختر لوناً</Label>
      <div className="flex gap-2">
        {colors.map((color, index) => (
          <button key={index} onClick={() => setColor(color.id)}>
            <Color
              className={cn(
                "w-12 h-12  shadow-md flex justify-center items-center",
                currentColor === color.id &&
                  "border-[1px] border-popover-foreground shadow-lg scale-105"
              )}
              {...color}
            >
              <MdDone
                className={cn(
                  "text-white hidden",
                  currentColor === color.id && "block"
                )}
              />
            </Color>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
