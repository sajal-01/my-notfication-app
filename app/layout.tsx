import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Sajal's Notification App",
  description:
    "A simple notification app using Next.js created by Sajal github: https://github.com/sajal-01",
  keywords: ["nextjs", "notification", "app"],
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
