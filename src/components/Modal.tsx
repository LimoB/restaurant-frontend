import type { ReactNode } from "react";

interface Props {
  isOpen?: boolean;       // Backward-compatible
  show?: boolean;         // Alternative prop for visibility
  title?: string;         // Optional title for the modal
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, show, title, onClose, children }: Props) {
  const visible = typeof show === "boolean" ? show : isOpen;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          aria-label="Close modal"
        >
          ✕
        </button>

        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {children}
      </div>
    </div>
  );
}
