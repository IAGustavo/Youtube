"use client";
import * as React from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const current = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      type="button"
      aria-label="Cambiar tema"
      className="inline-flex items-center gap-2 rounded-md border border-neutral-300/60 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
    >
      <span className="hidden sm:inline">Tema</span>
      <span aria-hidden>
        {current === "dark" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18a6 6 0 100-12 6 6 0 000 12z"></path><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364 6.364l-1.414-1.414M8.05 8.05L6.636 6.636m10.728 0l-1.414 1.414M8.05 15.95l-1.414 1.414"/></svg>
        )}
      </span>
    </button>
  );
}
