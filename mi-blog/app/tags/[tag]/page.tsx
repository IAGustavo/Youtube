import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/mdx";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tags).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = await getAllPosts();
  const list = posts.filter((p) => p.tags.includes(tag));
  if (list.length === 0) return notFound();
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Tag: #{tag}</h1>
      <div className="mt-6 grid gap-4">
        {list.map((p) => (
          <PostCard
            key={p.slug}
            title={p.title}
            description={p.description}
            date={p.date}
            tags={p.tags}
            slug={p.slug}
          />
        ))}
      </div>
      <div className="mt-8">
        <Link href="/tags" className="text-sm underline underline-offset-4">Ver todos los tags</Link>
      </div>
    </section>
  );
}
