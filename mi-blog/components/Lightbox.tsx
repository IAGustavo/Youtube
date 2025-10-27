"use client";
import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
};

export default function Lightbox({ open, onClose, src, alt, caption }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function trap(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      if (document.activeElement === last && !e.shiftKey) {
        e.preventDefault();
        first?.focus();
      } else if (document.activeElement === first && e.shiftKey) {
        e.preventDefault();
        last?.focus();
      }
    }

    document.addEventListener("keydown", trap);
    first?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div ref={ref} className="relative max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 rounded-md bg-neutral-900/80 px-2 py-1 text-sm text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
        >
          ✕
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="max-h-[80vh] w-full object-contain" />
        {caption && <p className="mt-2 text-center text-sm text-neutral-300">{caption}</p>}
      </div>
    </div>
  );
}
