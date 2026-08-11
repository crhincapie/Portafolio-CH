"use client";

import { Modal } from "@/components/ui/Modal";

interface PrototypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  prototypeUrl: string;
  aspectRatio?: number;
  zoom?: number;
}

export function PrototypeModal({ isOpen, onClose, prototypeUrl, aspectRatio, zoom = 1 }: PrototypeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} aspectRatio={aspectRatio}>
      {aspectRatio ? (
        <div className="relative h-full w-full overflow-hidden">
          <iframe
            src={prototypeUrl}
            style={{
              border: "none",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: `${zoom * 100}%`,
              height: `${zoom * 100}%`,
            }}
            allowFullScreen
          />
        </div>
      ) : (
        <iframe
          src={prototypeUrl}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen
        />
      )}
    </Modal>
  );
}
