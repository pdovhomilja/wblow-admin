import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="flex flex-col justify-center p-5">
      <section> Wblow - admin</section>
      <nav className="flex flex-col space-y-3 mt-10">
        <Link href="/">Dashboard</Link>
        <Separator />
        <Link href="/accounts">Accounts</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
