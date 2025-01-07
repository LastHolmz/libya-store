import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
interface Props {
  icon: ReactNode;
  content: string;
  title: string;
  children: ReactNode;
  className?: string;
  href?: string;
}
const InfoCard = ({
  content,
  icon,
  children,
  title,
  className,
  href,
}: Props) => {
  return (
    <Link href={href ? href : "#"}>
      <div className=" bg-secondary grid transition-all duration-500 hover:bg-secondary/80 shadow-md rounded-2xl px-4 py-4">
        <div className="my-2">
          <div className="flex justify-between items-center">
            <h4>{title}</h4>
            <p className=" font-bold text-xl my-1"> {content}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {children}
          <div className={cn("text-white w-12 rounded-full p-3", className)}>
            {icon}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InfoCard;
