import { Input } from "@/components/ui/input";
import React from "react";
import Profile from "./profile";
import ToggleTheme from "@/components/theme-toggle";
// import { getSession } from "@/lib/session";

const Header = async () => {
  // const user = await getSession();
  // if (!user) return null;
  return (
    <header className="flex justify-between items-center bg-secondary py-2 px-4">
      <div>
        <Input type="text" placeholder="ابحث" />
      </div>
      <div className="flex justify-center items-center gap-2">
        <ToggleTheme />
        {/* <Profile fullName={user.fullName} role={user.role} /> */}
      </div>
    </header>
  );
};

export default Header;
