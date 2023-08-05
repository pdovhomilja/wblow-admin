import { prismadb } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    //create variable uuid and generate uuid v4 here
    const generateUUID = () => {
      let d = new Date().getTime();
      let d2 =
        (performance && performance.now && performance.now() * 1000) || 0;
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          let r = Math.random() * 16;
          if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
          } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
          }
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
    };

    const uuid = generateUUID();

    console.log(uuid, "uuid");

    const accounts = await prismadb.accounts.updateMany({
      data: {
        publicKey: uuid,
      },
    });
    return NextResponse.json(
      { message: "Service task done", uuid: uuid },
      { status: 200 }
    );
  } catch (error) {
    console.log("[USERS_POST]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}
