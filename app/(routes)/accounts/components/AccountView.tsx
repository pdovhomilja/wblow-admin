import React from "react";
import { Accounts } from "@prisma/client";

import { getAccounts } from "@/actions/get-accounts";

import { columns } from "../table-components/columns";
import { AccountDataTable } from "../table-components/data-table";

const AccountView = async () => {
  const accounts: Accounts[] = await getAccounts();

  return (
    <div className="border rounded-md p-5 mt-5">
      <div>
        <AccountDataTable data={accounts} columns={columns} />
      </div>
    </div>
  );
};

export default AccountView;
