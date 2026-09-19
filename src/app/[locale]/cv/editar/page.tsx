import type { Metadata } from "next";
import { getSessionUser } from "@/lib/cv/auth";
import { CvAuthGate } from "@/components/cv/CvAuthGate";
import { routing } from "@/i18n/routing";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CV · Edición privada",
  robots: { index: false, follow: false },
};

export default async function CvEditorPage() {
  const user = await getSessionUser();
  return <CvAuthGate authed={Boolean(user)} />;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}