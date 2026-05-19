import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00feff]/90">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">{t("title")}</h1>
      <p className="mt-4 text-sm leading-relaxed text-zinc-400">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-[#00feff]/60 hover:text-[#00feff]"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
