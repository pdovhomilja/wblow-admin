import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prismadb } from "@/lib/prisma";
export async function GET(
  req: Request,
  { params }: { params: { licenseId: string } }
) {
  const { licenseId } = params;

  const license = await prismadb.licenses.findFirst({
    where: {
      assignedAccountId: licenseId,
    },
  });

  return NextResponse.json(license);
}
