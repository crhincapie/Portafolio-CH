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
        className="block w-full rounded-2xl border border-transparent bg-zinc-900/85 px-4 py-3 text-[#00feff] transition hover:border-accent-strong light:bg-surface-2 light:text-[#0e7490]"
      >
        {label}
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
