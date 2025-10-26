import type { ReactNode } from "react";

export default function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-6 border-l-4 border-neutral-300 pl-4 italic text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
      {children}
    </blockquote>
  );
}
