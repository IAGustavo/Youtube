"use client";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import Link from "next/link";

export type SearchItem = { title: string; description?: string; tags: string[]; slug: string };

export default function Search({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "description", "tags"],
        threshold: 0.35,
      }),
    [items]
  );

  const results = q ? fuse.search(q).map((r) => r.item) : items.slice(0, 10);

  return (
    <div className="space-y-4">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar..."
        className="w-full rounded-md border border-neutral-300/60 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-900"
        aria-label="Buscar"
      />
      <ul className="space-y-2">
        {results.map((it) => (
          <li key={it.slug} className="text-sm">
            <Link href={`/blog/${it.slug}`} className="hover:underline underline-offset-4">
              {it.title}
            </Link>
            {it.description ? (
              <span className="text-neutral-500"> — {it.description}</span>
            ) : null}
          </li>
        ))}
        {results.length === 0 && <li className="text-neutral-500">Sin resultados</li>}
      </ul>
    </div>
  );
}
