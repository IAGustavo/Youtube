import Link from "next/link";

export default function Tag({ tag, count }: { tag: string; count?: number }) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
    >
      #{tag}{typeof count === "number" ? ` (${count})` : ""}
    </Link>
  );
}
