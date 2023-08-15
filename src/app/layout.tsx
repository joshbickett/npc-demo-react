import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatGPT NPC",
  description: "Learn how to create NPCs with ChatGPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="https://www.mysteries.ai/favicon.jpg" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
