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

    if (!verifiedKey) {
      return NextResponse.json({ message: "Invalid" }, { status: 200 });
    }

    const data = {
      name: verifiedKey.name,
      email: verifiedKey.email,
      status: verifiedKey.status,
    };

    return NextResponse.json({ message: "Valid", data }, { status: 200 });
  } catch (error) {
    console.log("[PUBLICKEY_GET]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}
