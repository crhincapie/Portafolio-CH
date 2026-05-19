"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
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
        <div className="relative h-[85vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/30 bg-black/20 backdrop-blur-2xl shadow-2xl">
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
