"use client";

import { Modal } from "@/components/ui/Modal";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CVModal({ isOpen, onClose }: CVModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full flex-col">
        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          <embed
            src="/cv.pdf#toolbar=0&navpanes=0"
            type="application/pdf"
            width="100%"
            height="100%"
            className="h-full w-full"
          />
        </div>

        {/* Download button */}
        <div className="flex items-center justify-center border-t border-white/10 p-6">
          <a
            href="/cv.pdf"
            download="Cristian-Hincapie-CV.pdf"
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
            Descargar CV
          </a>
        </div>
      </div>
    </Modal>
  );
}
