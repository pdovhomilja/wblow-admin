import { getAccount } from "@/actions/get-account";
import Container from "@/components/Container";
import { Accounts } from "@prisma/client";
import React from "react";

interface AccountDetailPageProps {
  params: {
    accountId: string;
  };
}

const AccountPage = async ({ params }: AccountDetailPageProps) => {
  const { accountId } = params;
  const account: Accounts = await getAccount(accountId);
  return (
    <Container title={`Account: ${account.name}`} description={""}>
      <pre>{JSON.stringify(account, null, 2)}</pre>
    </Container>
  );
};

export default AccountPage;
