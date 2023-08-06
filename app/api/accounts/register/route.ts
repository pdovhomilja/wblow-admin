import { prismadb } from "@/lib/prisma";
import sendEmail from "@/lib/sendmail";
import { generateRandomPassword } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, phone } = body;

  const password = await generateRandomPassword();

  const hashPassowrd = await await hash(password, 12);

  const newAccount = await prismadb.accounts.create({
    data: {
      name,
      email,
      phone,
      password: hashPassowrd,
    },
  });

  await prismadb.licenses.create({
    data: {
      assignedAccountId: newAccount.id,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  const message = `Vygenerovali jsme pro Vás přístupové údaje k aplikace Wblow. Příhlásit se můžete na https://wblow.online/sign-in. \n\n Uživatelské jméno: ${email} \n Heslo: ${password} \n\n Váš privátní kód pro aplikaci wblow je: ${newAccount.publicKey}\n\n  Děkujeme za Váš zájem o aplikaci Wblow. \n\n Tým Wblow`;

  await sendEmail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Vítejte v aplikaci Wblow`,
    text: message,
  });
  return NextResponse.json({ body });
}
