import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { ConfigDashboard } from "@/components/config-dashboard";
import { ConfigLogin } from "@/components/config-login";
import {
  CONFIG_AUTH_COOKIE,
  CONFIG_AUTH_VALUE,
} from "@/lib/config-auth";
import { loadSiteConfig } from "@/lib/site-config";

export default async function ConfigPage() {
  noStore();

  const cookieStore = await cookies();
  const isAuthorized =
    cookieStore.get(CONFIG_AUTH_COOKIE)?.value === CONFIG_AUTH_VALUE;

  if (!isAuthorized) {
    return <ConfigLogin />;
  }

  const config = await loadSiteConfig();

  return <ConfigDashboard initialConfig={config} />;
}
