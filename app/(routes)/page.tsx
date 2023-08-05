import { getAccounts } from "@/actions/get-accounts";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accounts } from "@prisma/client";
import { UsersIcon } from "lucide-react";
import Container from "@/components/Container";

export default async function Home() {
  const accounts: Accounts[] = await getAccounts();

  return (
    <Container
      title="Dashboard"
      description={
        "Welcome to Wblow-admin cockpit, here you can see your overview"
      }
    >
      <Card className="w-56">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accounts</CardTitle>
          <UsersIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-medium">
            {accounts ? accounts.length : "0"}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
