"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur dark:bg-neutral-950/70 border-b border-neutral-200/60 dark:border-neutral-800">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold tracking-tight hover:opacity-80">
            Mi Blog
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/blog" className="hover:underline underline-offset-4">Blog</Link>
          <Link href="/tags" className="hover:underline underline-offset-4">Tags</Link>
          <Link href="/search" className="hover:underline underline-offset-4">Buscar</Link>
          <Link href="/about" className="hover:underline underline-offset-4">Acerca</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
