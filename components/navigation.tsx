"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TabLinkProps {
  href: string;
  content: string;
  className?: string;
}

export default function NavigationTabs({
  children,
  className,
  scrollClassName,
}: {
  children: React.ReactNode;
  className?: string;
  scrollClassName?: string;
}) {
  return (
    <ScrollArea
      dir="rtl"
      className={cn(
        "w-full max-w-full whitespace-nowrap min-h-full h-11 bg-secondary",
        scrollClassName
      )}
    >
      <div className="flex h-max w-max">
        <nav
          className={cn(
            "flex flex-row h-full justify-start flex-wrap gap-1 px-4 bg-secondary",
            className
          )}
          dir="rtl"
        >
          {children}
        </nav>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export function TabLink({ href, content, className }: TabLinkProps) {
  const pathname = usePathname();
  return (
    <div className="relative w-fit my-1">
      <Link
        className={cn(
          className,
          "flex-center text-sm  h-12 px-4 transition-all py-2 rounded-sm",
          pathname.startsWith(href)
            ? "text-primary"
            : "text-foreground hover:bg-primary/20"
        )}
        href={href}
      >
        {content}
      </Link>
      <div
        className={cn(
          "h-0.5 w-full transition-all absolute -bottom-3 rounded-t-lg",
          pathname.startsWith(href) && "bg-primary"
        )}
      />
    </div>
  );
}
export function HomeTabLink({ href, content, className }: TabLinkProps) {
  const path = usePathname();
  const pathname = path.split("?")[0];
  return (
    <div className="relative my-1 w-fit">
      <Link
        className={cn(
          className,
          "flex-center text-sm  h-12 px-4 transition-all py-2 rounded-sm",
          pathname === `${href}`
            ? "text-primary"
            : "text-foreground hover:bg-primary/20"
        )}
        href={href}
      >
        {content}
      </Link>
      <div
        className={cn(
          "h-0.5 w-full absolute -bottom-3 transition-all rounded-t-lg",
          pathname === `${href}` && "bg-primary"
        )}
      />
    </div>
  );
}
