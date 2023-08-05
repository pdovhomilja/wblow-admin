import { prismadb } from "@/lib/prisma";

export const getAccount = async (id: string) => {
  const data = await prismadb.accounts.findFirst({
    where: {
      id,
    },
  });
  if (!data) throw new Error("Account not found");
  return data;
};
