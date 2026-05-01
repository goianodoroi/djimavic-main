import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import { HomePage } from "@/components/home-page";
import { getPublicSiteConfig } from "@/lib/site-config";
import type { SearchParamsInput } from "@/lib/localization/types";

type PageProps = {
  searchParams?: Promise<SearchParamsInput> | SearchParamsInput;
};

export default async function Page({ searchParams }: PageProps) {
  noStore();

  const requestHeaders = await headers();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const config = await getPublicSiteConfig({
    headers: requestHeaders,
    searchParams: resolvedSearchParams,
  });

  return <HomePage {...config} />;
}
