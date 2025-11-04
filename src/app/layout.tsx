import "./globals.css";

import Header from "@/components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital House",
  description: "E-commerce demo built with Next.js + TypeScript + Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="no-scrollbar font-sans antialiased bg-gray-50 text-gray-900">
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
