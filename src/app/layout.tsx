import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "@/lib/structured-data";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Cristian Hincapié — Senior Product Designer",
    template: "%s · Cristian Hincapié",
  },
  description:
    "Product Designer y UX/UI Lead con enfoque en fintech, salud y productos complejos. Bogotá, Colombia. Sistemas de diseño, estrategia y ejecución front-end.",
  keywords: [
    "Senior Product Designer",
    "UX/UI Designer Colombia",
    "Design Lead LATAM",
    "Product Designer Fintech",
    "AI Product Designer",
    "UX Designer Bogotá",
    "Product Design Portfolio",
    "Senior UX Designer",
    "Product Strategy Designer",
    "UX Lead LATAM",
  ],
  authors: [{ name: "Cristian Hincapié" }],
  creator: "Cristian Hincapié",
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    siteName: "Cristian Hincapié",
    title: "Cristian Hincapié — Senior Product Designer",
    description:
      "Diseño de producto, UX/UI y liderazgo multidisciplinario. Casos en fintech, salud y servicios.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristian Hincapié — Senior Product Designer",
    description:
      "Portfolio senior: estrategia de producto, UX basada en evidencia y sistemas de diseño.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const personLd = buildPersonJsonLd(locale);
  const siteLd = buildWebSiteJsonLd(locale);

  return (
    <html lang={locale} className={figtree.variable} suppressHydrationWarning>
      <body className="min-h-dvh bg-zinc-950 text-zinc-100 antialiased">
        <JsonLd data={[personLd, siteLd]} />
        <NextIntlClientProvider messages={messages}>
          <SiteShell>{children}</SiteShell>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
