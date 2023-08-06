import { prismadb } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { emailId: string } }
) {
  const { emailId } = params;

  try {
    const user = await prismadb.accounts.findFirst({
      where: {
        email: emailId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USERS_GET]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}
