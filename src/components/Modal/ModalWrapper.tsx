import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

export default function ModalWrapper({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 min-w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
