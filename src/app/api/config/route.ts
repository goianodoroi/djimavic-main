import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {
  CONFIG_AUTH_COOKIE,
  CONFIG_AUTH_VALUE,
} from "@/lib/config-auth";
import {
  sanitizeSiteConfig,
  saveSiteConfig,
} from "@/lib/site-config";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAuthorized =
    cookieStore.get(CONFIG_AUTH_COOKIE)?.value === CONFIG_AUTH_VALUE;

  if (!isAuthorized) {
    return NextResponse.json(
      { error: "Sessao expirada. Entre novamente." },
      { status: 401 },
    );
  }

  const body = (await request.json().catch(() => null)) as unknown;

  if (!body) {
    return NextResponse.json(
      { error: "Payload invalido." },
      { status: 400 },
    );
  }

  const config = sanitizeSiteConfig(body);
  const savedConfig = await saveSiteConfig(config);

  revalidatePath("/");
  revalidatePath("/config");

  return NextResponse.json({
    ok: true,
    config: savedConfig,
  });
}
