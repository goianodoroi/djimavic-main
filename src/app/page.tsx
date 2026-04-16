import { unstable_noStore as noStore } from "next/cache";
import { HomePage } from "@/components/home-page";
import { getPublicSiteConfig } from "@/lib/site-config";

export default async function Page() {
  noStore();

  const config = await getPublicSiteConfig();

  return <HomePage {...config} />;
}
