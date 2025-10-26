import Search from "@/components/Search";
import { getAllPosts } from "@/lib/mdx";

export default async function SearchPage() {
  const posts = await getAllPosts();
  const items = posts.map((p) => ({
    title: p.title,
    description: p.description,
    tags: p.tags,
    slug: p.slug,
  }));
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Buscar</h1>
      <div className="mt-6">
        <Search items={items} />
      </div>
    </section>
  );
}
