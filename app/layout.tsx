import type { Metadata } from "next";
import "./globals.css";
import { AppConfig } from "@/config/app.config";

export const metadata: Metadata = {
  title: AppConfig().app.name,
  description: "This is description",
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
