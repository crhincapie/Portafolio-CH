"use client";

import { ReactNode, useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  aspectRatio?: number;
}

export function Modal({ isOpen, onClose, children, aspectRatio }: ModalProps) {
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    if (!isOpen || !aspectRatio) {
      setBox(null);
      return;
    }
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const pad = vw < 640 ? 16 : vw < 768 ? 24 : 32;
      const maxW = Math.min(56 * 16, vw - pad);
      const maxH = vh * 0.85;
      let w = maxW;
      let h = w / aspectRatio;
      if (h > maxH) {
        h = maxH;
        w = h * aspectRatio;
      }
      setBox({ w: Math.floor(w), h: Math.floor(h) });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [isOpen, aspectRatio]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop con glass effect mejorado */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Modal con glass morphism más pronunciado */}
        <div
          className={
            aspectRatio && box
              ? "relative overflow-hidden rounded-3xl border border-white/30 bg-black/20 backdrop-blur-2xl shadow-2xl"
              : "relative h-[85vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/30 bg-black/20 backdrop-blur-2xl shadow-2xl"
          }
          style={aspectRatio && box ? { width: box.w, height: box.h } : undefined}
        >
          {/* Close button - Estilo turquesa con icono negro */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#00feff] text-zinc-950 transition duration-200 hover:bg-[#7afcff] hover:shadow-lg active:scale-95"
            aria-label="Close modal"
            title="Cerrar"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content - scrollable */}
          <div className="h-full w-full overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
