import ToggleTheme from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header
      className="
     mx-auto border-b shadow-md py-4 w-full border-b-foreground/20"
    >
      {/* <Link className=" overflow-hidden h-24 w-24" href={"/"}>
        <Image
          src={"/logo.jpeg"}
          alt="logo"
          className=" w-full h-full object-cover"
          width={500}
          height={100}
        />
      </Link> */}
      <div className="flex justify-between items-center container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="w-full lg:flex  items-center hidden">
          <ul className="flex gap-5 items-center">
            <li>
              <Link href={"#"}>شراء</Link>
            </li>
            <li>
              <Link href={"#"}>أعلى المبيعات</Link>
            </li>
            <li>
              <Link href={"#"}>آخر البضائع</Link>
            </li>
            <li>
              <Link href={"#"}>البراندات</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center phone-only:justify-between justify-end w-full gap-2">
          <div className="flex">
            <Input placeholder="ابحث هنا" className="lg:min-w-80 max-w-sm" />
          </div>
          <div className="flex gap-1">
            <Button variant={"ghost"} size={"icon"}>
              <CiShoppingCart />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <FaRegUserCircle />
            </Button>
            <div className="phone-only:hidden">
              <ToggleTheme />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
