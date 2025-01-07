import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
// import Logout from "@/components/logout";
import { IoMdLogOut } from "react-icons/io";

interface Props {
  fullName: string;
  role: string;
}

const Profile = ({ fullName, role }: Props) => {
  return (
    <div className="flex justify-between items-center gap-3">
      <Button variant={"ghost"} size={"icon"}>
        <Info fontSize={"12px"} />
      </Button>
      <div className="flex-center-col gap-2">
        <h3 className=" font-semibold text-lg">{fullName}</h3>
        <div>{role}</div>
      </div>
      {/* <Logout>
        <Button variant={"destructive"} size={"icon"}>
          <IoMdLogOut className="w-4 h-4" />
        </Button>
      </Logout> */}
      {/* <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> */}
    </div>
  );
};

export default Profile;
