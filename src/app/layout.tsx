import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
