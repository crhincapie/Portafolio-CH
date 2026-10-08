"use client";

import { useState } from "react";
import { PrototypeModal } from "@/components/case-study/PrototypeModal";

interface PrototypeLinkButtonProps {
  label: string;
  url: string;
  aspectRatio?: number;
  zoom?: number;
}

export function PrototypeLinkButton({ label, url, aspectRatio, zoom }: PrototypeLinkButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn-border-animate-teal group w-full rounded-[12px]"
      >
        <span className="relative z-10 inline-flex w-full items-center justify-center rounded-[10px] bg-zinc-900/85 px-4 py-3 text-sm font-medium text-[#00feff] transition group-hover:text-white light:bg-surface-2 light:text-[#0e7490]">
          {label}
        </span>
      </button>
      <PrototypeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        prototypeUrl={url}
        aspectRatio={aspectRatio}
        zoom={zoom}
      />
    </>
  );
}
