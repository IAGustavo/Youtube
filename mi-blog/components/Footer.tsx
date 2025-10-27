export default function Footer() {
  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800 mt-12">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-neutral-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()}</span>
          <span className="select-none">•</span>
          <span>Mi Blog</span>
        </div>
        <p className="opacity-70">Construido con Next.js</p>
      </div>
    </footer>
  );
}
