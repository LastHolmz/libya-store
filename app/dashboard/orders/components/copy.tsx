"use client";
import { Copy } from "@/components/copy-to-clipboard";
import React from "react";

interface CopyProps {
  value: string;
  children?: React.ReactNode;
}

const CopyOrderItem = ({ value, children }: CopyProps) => {
  return (
    <div className="flex group hover:bg-accent px-2 py-1 rounded justify-between gap-2 items-center md:max-w-sm">
      <span>{children}</span>
      <span className="hidden p-2 transition-all duration-500 group-hover:flex">
        <Copy value={value} />
      </span>
    </div>
  );
};

export default CopyOrderItem;
