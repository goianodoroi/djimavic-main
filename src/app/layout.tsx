import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import Script from "next/script";
import { extractHeadScriptBlocks, loadSiteConfig } from "@/lib/site-config";
import "video.js/dist/video-js.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "DJI Mavic 4 Pro",
  description: "Promotional landing page for the DJI Mavic 4 Pro kit.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  noStore();

  const config = await loadSiteConfig();
  const headScripts = extractHeadScriptBlocks(config.utmfyHeadScript);

  return (
    <html lang="en">
      <head>
        {headScripts.map((scriptContent, index) => (
          <Script
            key={`utmfy-head-${index}`}
            id={`utmfy-head-${index}`}
            strategy="beforeInteractive"
          >
            {scriptContent}
          </Script>
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
