import Container from "@/components/Container";
import React from "react";
import AccountView from "./components/AccountView";

type Props = {};

const AccountsPage = (props: Props) => {
  return (
    <Container title="Accounts" description={""}>
      <AccountView />
    </Container>
  );
};

export default AccountsPage;
