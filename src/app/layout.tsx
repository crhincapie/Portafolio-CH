import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { siteConfig } from "@/config/site";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "@/lib/structured-data";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

/* Favicon: monograma CH sobre teja oscura (legible en pestañas claras y oscuras). */
const FAVICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">' +
  '<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="55" y1="25" x2="100" y2="95">' +
  '<stop offset="0" stop-color="#00feff"/><stop offset="1" stop-color="#6366f1"/></linearGradient></defs>' +
  '<rect width="120" height="120" rx="28" fill="#09090b"/>' +
  '<g transform="translate(60 60) scale(.8) translate(-57.5 -60)" stroke-width="12" stroke-linecap="round" fill="none">' +
  '<path d="M67.5 34.02A30 30 0 1 0 67.5 85.98" stroke="#fafaf9"/>' +
  '<path d="M52.5 60H97.5M97.5 30V90" stroke="url(#g)"/>' +
  '<circle cx="52.5" cy="60" r="9" fill="#00feff" stroke="none"/></g></svg>';
const FAVICON = `data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}`;

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
  icons: {
    icon: [{ url: FAVICON, type: "image/svg+xml" }],
    shortcut: FAVICON,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const personLd = buildPersonJsonLd(locale);
  const siteLd = buildWebSiteJsonLd(locale);

  return (
    <html lang={locale} className={figtree.variable} suppressHydrationWarning>
      <body className="min-h-dvh">
        <ThemeScript />
        <JsonLd data={[personLd, siteLd]} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SiteShell>{children}</SiteShell>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
