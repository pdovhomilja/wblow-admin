import { prismadb } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const data = {
    message:
      "This is service route for updating data model. Nothing to change now",
  };
  return NextResponse.json({ data });
}
