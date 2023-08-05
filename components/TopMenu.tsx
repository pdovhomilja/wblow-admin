import React from "react";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ui/ModeToggle";

type Props = {};

const TopMenu = (props: Props) => {
  return (
    <div className="flex justify-end p-5 w-full items-center space-x-5">
      <div>
        <ModeToggle />
      </div>
      <div>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default TopMenu;
