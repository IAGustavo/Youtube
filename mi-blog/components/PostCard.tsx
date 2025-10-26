import Link from "next/link";
import { formatDateISO } from "@/lib/utils";

export default function PostCard({
  title,
  description,
  date,
  tags,
  slug,
}: {
  title: string;
  description?: string;
  date: string;
  tags: string[];
  slug: string;
}) {
  return (
    <article className="rounded-lg border border-neutral-200/60 dark:border-neutral-800 p-4 hover:shadow-sm transition">
      <h3 className="text-lg font-semibold tracking-tight">
        <Link href={`/blog/${slug}`} className="hover:underline underline-offset-4">
          {title}
        </Link>
      </h3>
      {description && (
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      )}
      <div className="mt-3 flex items-center gap-3 text-xs text-neutral-500">
        <time dateTime={date}>{formatDateISO(date)}</time>
        <span>•</span>
        <div className="flex flex-wrap gap-1">
          {tags.map((t) => (
            <Link key={t} href={`/tags/${t}`} className="rounded bg-neutral-100 px-2 py-0.5 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
              #{t}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
