"use client";
import { Sidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaRegNewspaper } from "react-icons/fa6";
import {
  MdOutlineCategory,
  MdOutlineInventory2,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { IconType } from "react-icons/lib";
import { GoHome } from "react-icons/go";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiMiniBars2 } from "react-icons/hi2";
import ToggleTheme from "@/components/theme-toggle";
import { GiTeacher } from "react-icons/gi";

const NavigationRailItem = ({
  href,
  collapsed = false,
  Icon,
  name,
  onClick,
}: {
  href: string;
  collapsed?: boolean;
  Icon: IconType;
  name: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}) => {
  const pathname = usePathname();

  return (
    <Link
      aria-label={name}
      onClick={onClick}
      className={cn(
        "flex justify-between hover:bg-primary/10 px-4 py-2 w-[80%] mx-auto items-center  gap-1 sm:gap-2 ",
        "whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        collapsed && "justify-center w-full rounded-none",
        pathname === href && "text-primary bg-primary/20",
        pathname.startsWith(href) && "text-primary bg-primary/20"
      )}
      href={href}
    >
      {!collapsed && (
        <div>
          <span>{name}</span>
        </div>
      )}
      <div>
        <Icon size={20} />
      </div>
    </Link>
  );
};
const NavigationRailHomeItem = ({
  href,
  collapsed,
  Icon,
  name,
  onClick,
}: {
  href: string;
  collapsed: boolean;
  Icon: IconType;
  name: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}) => {
  const pathname = usePathname();
  return (
    <Link
      onClick={onClick}
      aria-label={name}
      className={cn(
        "flex justify-between hover:bg-primary/10 px-4 py-2 w-[80%] mx-auto items-center  gap-1 sm:gap-2 ",
        "whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        collapsed && "justify-center w-full rounded-none",
        href === pathname && "text-primary bg-primary/20"
      )}
      href={href}
    >
      {!collapsed && (
        <div>
          {" "}
          <span>{name}</span>
        </div>
      )}
      <div>
        <Icon size={20} />
      </div>
    </Link>
  );
};

const NavigationRail = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "hsl(var(--secondary))",
        },
      }}
      rtl
      className="fixed top-0 right-0 bg-secondary h-screen"
      collapsed={collapsed}
    >
      <div
        className={cn(
          "w-full flex items-center justify-between px-2 py-2",
          collapsed && "justify-center px-0 py-2"
        )}
      >
        <Button
          dir="rtl"
          size={"icon"}
          variant={"ghost"}
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </Button>
      </div>
      <Menu>
        <li className="my-2">
          <NavigationRailHomeItem
            collapsed={collapsed}
            href="/dashboard"
            Icon={GoHome}
            name="لوحة التحكم"
          />
        </li>
        <li className="my-2">
          <NavigationRailItem
            collapsed={collapsed}
            href="/dashboard/employees"
            Icon={MdOutlineManageAccounts}
            name="الموظفين"
          />
        </li>
        <li className="my-2">
          <NavigationRailItem
            collapsed={collapsed}
            Icon={MdOutlineCategory}
            href="/dashboard/categories"
            name="الأصناف"
          />
        </li>
        <li className="my-2">
          <NavigationRailItem
            collapsed={collapsed}
            href="/dashboard/inventory"
            Icon={MdOutlineInventory2}
            name="المخزون"
          />
        </li>
      </Menu>
    </Sidebar>
  );
};

export const DashboardNavigation = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger className="block md:hidden">
        <Button asChild variant={"ghost"} size={"icon"}>
          <HiMiniBars2 size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <nav className="w-full mt-10">
          <ul className="flex items-center flex-col h-full text-center justify-center gap-5 w-full">
            <li className="my-2 w-full">
              <NavigationRailHomeItem
                href="/dashboard"
                Icon={GoHome}
                name="لوحة التحكم"
                collapsed={false}
                onClick={toggleOpen}
              />
            </li>

            <li className="w-full">
              <NavigationRailItem
                href="/dashboard/employees"
                Icon={FaRegNewspaper}
                name="الموظفين"
                onClick={toggleOpen}
              />
            </li>
            <li className="w-full">
              <NavigationRailItem
                name="الأصناف"
                Icon={MdOutlineCategory}
                href="/dashboard/categories"
                onClick={toggleOpen}
              />
            </li>
            <li className="w-full">
              <NavigationRailItem
                href="/dashboard/inventory"
                Icon={MdOutlineInventory2}
                name="المخزون"
                onClick={toggleOpen}
              />
            </li>
          </ul>
        </nav>
        <div className="flex justify-center items-center flex-col gap-1"></div>
      </SheetContent>
    </Sheet>
  );
};

export const DashboardHeader = () => {
  return (
    <header className="w-full phone-only:flex justify-between items-center hidden bg-background px-4 py-2">
      <DashboardNavigation />
      <ToggleTheme />
    </header>
  );
};

export default NavigationRail;
