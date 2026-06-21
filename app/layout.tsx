import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solvix - Соларна енергија",
  description:
    "Solvix нуди модерни соларни решенија за домови, бизниси и заедници."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mk">
      <body>{children}</body>
    </html>
  );
}
