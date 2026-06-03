import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS/Admin Automation",
  description: "WhatsApp order tracking dashboard",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
