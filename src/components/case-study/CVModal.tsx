"use client";

import { Modal } from "@/components/ui/Modal";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useLocale, useTranslations } from "next-intl";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CVModal({ isOpen, onClose }: CVModalProps) {
  const t = useTranslations("contact");
  const locale = useLocale();
  const { theme } = useTheme();

  const lang = locale === "en" ? "en" : "es";
  const mode = theme === "light" ? "light" : "dark";
  const html = lang === "en" ? "/cv/cv-en.html" : "/cv/cv.html";
  const src = `${html}?theme=${mode}&embed=1`;
  const pdf = `/cv/pdf/cv-${lang}-${mode}.pdf`;
  const downloadName = `Cristian-Hincapie-CV-${lang.toUpperCase()}-${
    mode.charAt(0).toUpperCase() + mode.slice(1)
  }.pdf`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full flex-col">
        {/* CV interactivo (HTML · respeta idioma y modo claro/oscuro) */}
        <div className="relative flex-1 overflow-hidden">
          <iframe
            key={src}
            src={src}
            title="CV"
            className="absolute inset-0 h-full w-full"
            allowFullScreen
          />
        </div>

        {/* Download button */}
        <div className="flex items-center justify-center border-t border-line p-6">
          <a
            href={pdf}
            download={downloadName}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00feff] px-8 py-3 text-sm font-semibold text-zinc-950 transition duration-200 hover:bg-[#7afcff] hover:shadow-lg active:scale-95"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16v-4m0 0V8m0 4h4m-4 0H8"
              />
            </svg>
            {t("downloadCV")}
          </a>
        </div>
      </div>
    </Modal>
  );
}
