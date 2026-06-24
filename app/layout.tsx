import type { Metadata } from "next";
import "./globals.css";

const mobileScrollResetScript = `
(function () {
  try {
    if (!window.matchMedia("(max-width: 980px)").matches) return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  } catch (error) {}
})();
`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: mobileScrollResetScript }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
