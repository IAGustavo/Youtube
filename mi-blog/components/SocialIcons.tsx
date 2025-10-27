import Link from "next/link";
import { site } from "@/config/site";
import type { ReactNode } from "react";

type Item = { key: keyof typeof site.social; href: string; label: string; icon: ReactNode };

function Icon({ name }: { name: string }) {
  const cls = "h-4 w-4";
  switch (name) {
    case "github":
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 00-3.162 19.492c.5.092.683-.217.683-.483 0-.237-.009-.866-.014-1.7-2.78.604-3.366-1.34-3.366-1.34-.454-1.154-1.11-1.462-1.11-1.462-.907-.62.069-.607.069-.607 1.003.07 1.53 1.03 1.53 1.03.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.252-4.555-1.11-4.555-4.943 0-1.09.39-1.983 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.505.338 1.909-1.294 2.748-1.025 2.748-1.025.546 1.376.202 2.393.1 2.646.64.699 1.028 1.592 1.028 2.682 0 3.842-2.339 4.688-4.566 4.936.359.309.679.92.679 1.855 0 1.338-.012 2.417-.012 2.746 0 .268.18.58.688.481A10 10 0 0012 2z"/></svg>
      );
    case "linkedin":
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.5c0-1.55 0-3.55-2.17-3.55-2.17 0-2.5 1.7-2.5 3.45V23h-4V8.5z"/></svg>
      );
    case "youtube":
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.75 15.5v-7l6 3.5-6 3.5z"/></svg>
      );
    case "twitter":
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.55 22c9.05 0 14-7.5 14-14 0-.213 0-.425-.015-.636A10.01 10.01 0 0024 4.56a9.8 9.8 0 01-2.83.776 4.94 4.94 0 002.163-2.723 9.86 9.86 0 01-3.127 1.195A4.92 4.92 0 0016.616 2c-2.72 0-4.926 2.206-4.926 4.927 0 .386.043.763.127 1.125C7.73 7.9 4.1 6.034 1.67 3.149a4.91 4.91 0 00-.666 2.477 4.927 4.927 0 002.19 4.103A4.9 4.9 0 01.96 9.2v.06c0 2.39 1.7 4.382 3.95 4.838a4.94 4.94 0 01-2.224.085 4.93 4.93 0 004.6 3.417A9.867 9.867 0 010 20.54a13.93 13.93 0 007.55 2.21"/></svg>
      );
    case "email":
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z"/></svg>
      );
    default:
      return <span className="sr-only">link</span>;
  }
}

export default function SocialIcons() {
  const entries: Item[] = (
    [
      { key: "twitter", href: site.social.twitter, label: "Twitter", icon: <Icon name="twitter" /> },
      { key: "github", href: site.social.github, label: "GitHub", icon: <Icon name="github" /> },
      { key: "linkedin", href: site.social.linkedin, label: "LinkedIn", icon: <Icon name="linkedin" /> },
      { key: "youtube", href: site.social.youtube, label: "YouTube", icon: <Icon name="youtube" /> },
      { key: "email", href: site.social.email, label: "Email", icon: <Icon name="email" /> },
    ] as Item[]
  ).filter((e) => !!e.href);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Redes sociales">
      <ul className="flex items-center gap-3">
        {entries.map((it) => (
          <li key={it.key}>
            <Link
              href={it.href}
              aria-label={it.label}
              className="inline-flex items-center justify-center rounded-md border border-transparent p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:text-neutral-300 dark:hover:text-white"
            >
              {it.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
