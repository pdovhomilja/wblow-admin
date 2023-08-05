import { prismadb } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { accountId: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { accountId } = params;

  if (!accountId) {
    return new Response("Account ID required", { status: 400 });
  }

  try {
    const user = await prismadb.accounts.update({
      where: {
        id: accountId,
      },
      data: {
        status: "inactive",
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[ACCOUNT_SET_INACTIVE_PUT]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}
