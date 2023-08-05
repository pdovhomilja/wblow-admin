import { prismadb } from "@/lib/prisma";

export const getAccounts = async () => {
  const data = await prismadb.accounts.findMany({});
  if (!data) throw new Error("Accounts not found");
  return data;
};
