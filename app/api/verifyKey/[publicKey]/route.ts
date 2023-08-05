import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prismadb } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { publicKey: string } }
) {
  const { publicKey } = params;
  if (!publicKey) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const verifiedKey = await prismadb.accounts.findFirst({
      where: {
        publicKey,
      },
    });

    console.log(verifiedKey, "verifiedKey");
    if (!verifiedKey) {
      return NextResponse.json({ message: "Invalid" }, { status: 200 });
    }

    return NextResponse.json({ message: "Valid" }, { status: 200 });
  } catch (error) {
    console.log("[PUBLICKEY_GET]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}
