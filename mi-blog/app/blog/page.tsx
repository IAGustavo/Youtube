import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/mdx";

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
      <div className="mt-6 grid gap-4">
        {posts.map((p) => (
          <PostCard
            key={p.slug}
            title={p.title}
            description={p.description}
            date={p.date}
            tags={p.tags}
            slug={p.slug}
          />
        ))}
        {posts.length === 0 && (
          <p className="text-neutral-600 dark:text-neutral-400">No hay entradas aún.</p>
        )}
      </div>
    </section>
  );
}
