"use client";
import { useState } from "react";
import type { GalleryItem } from "@/lib/gallery";
import Lightbox from "@/components/Lightbox";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const current = openIndex != null ? items[openIndex] : null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((it, idx) => (
          <li key={it.src} className="relative">
            <button
              type="button"
              onClick={() => setOpenIndex(idx)}
              className="group block w-full overflow-hidden rounded-lg border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              aria-label={it.alt}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
            {it.caption && (
              <p className="mt-1 line-clamp-1 text-xs text-neutral-400" title={it.caption}>
                {it.caption}
              </p>
            )}
          </li>
        ))}
      </ul>

      {current && (
        <Lightbox
          open={openIndex != null}
          onClose={() => setOpenIndex(null)}
          src={current.src}
          alt={current.alt}
          caption={current.caption}
        />
      )}
    </>
  );
}
