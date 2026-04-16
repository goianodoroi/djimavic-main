import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  CONFIG_AUTH_COOKIE,
  CONFIG_AUTH_VALUE,
  CONFIG_PASSWORD,
} from "@/lib/config-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { password?: string }
    | null;

  if (body?.password !== CONFIG_PASSWORD) {
    return NextResponse.json(
      { error: "Senha invalida." },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(CONFIG_AUTH_COOKIE, CONFIG_AUTH_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json({ ok: true });
}
