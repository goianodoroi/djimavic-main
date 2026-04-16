import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CONFIG_AUTH_COOKIE } from "@/lib/config-auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(CONFIG_AUTH_COOKIE);

  return NextResponse.json({ ok: true });
}
