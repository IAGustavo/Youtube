"use client";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import SocialIcons from "@/components/SocialIcons";
import { site } from "@/config/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full supports-[backdrop-filter]:bg-white/60 bg-white/80 backdrop-blur border-b border-neutral-200 shadow-sm">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded-md">
            <Avatar name={site.name} subtitle={site.title} size={36} rounded />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/blog" className="hover:underline underline-offset-4">Blog</Link>
          <Link href="/tags" className="hover:underline underline-offset-4">Tags</Link>
          <Link href="/search" className="hover:underline underline-offset-4">Buscar</Link>
          <Link href="/about" className="hover:underline underline-offset-4">Acerca</Link>
        </nav>
        <div className="hidden sm:block">
          <SocialIcons />
        </div>
      </div>
    </header>
  );
}
