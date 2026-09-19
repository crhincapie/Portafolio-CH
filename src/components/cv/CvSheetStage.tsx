"use client";

import { useEffect, useRef, useState } from "react";
import { CvData, CvSectionKey } from "@/lib/cv/types";
import { CvSheet } from "./CvSheet";

interface CvSheetStageProps {
  data: CvData;
  theme: "dark" | "light";
  lang: "es" | "en";
  onEditSection?: (key: CvSectionKey, jobId?: string) => void;
}

export function CvSheetStage({ data, theme, lang, onEditSection }: CvSheetStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const compute = () => {
      const width = el.clientWidth;
      setScale(Math.min(1, width / 792));
    };
    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="cv-print-area w-full overflow-auto pb-12">
      <div
        className="cv-sheet-stage relative"
        style={{ width: 792, minHeight: 1740, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        <CvSheet data={data} theme={theme} lang={lang} onEditSection={onEditSection} />
      </div>
    </div>
  );
}