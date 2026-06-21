import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Volnix - Соларна енергија",
  description:
    "Volnix нуди модерни соларни решенија за домови, бизниси и заедници."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mk">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
