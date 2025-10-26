import Tag from "@/components/Tag";
import { getTagCounts } from "@/lib/mdx";

export default async function TagsPage() {
  const counts = await getTagCounts();
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Tags</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        {entries.map(([tag, count]) => (
          <Tag key={tag} tag={tag} count={count} />
        ))}
        {entries.length === 0 && (
          <p className="text-neutral-600 dark:text-neutral-400">No hay etiquetas aún.</p>
        )}
      </div>
    </section>
  );
}
