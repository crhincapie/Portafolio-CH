"use client";

import { Modal } from "@/components/ui/Modal";

interface PrototypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  prototypeUrl: string;
}

export function PrototypeModal({ isOpen, onClose, prototypeUrl }: PrototypeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <iframe
        src={prototypeUrl}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allowFullScreen
      />
    </Modal>
  );
}
