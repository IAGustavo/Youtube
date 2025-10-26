import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/mdx";

export default async function Home() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 3);
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 font-semibold">
            MB
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Bienvenido a mi espacio</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Pensamientos, notas, fotos y cosas que me inspiran. {" "}
              <Link href="/about" className="underline underline-offset-4">Saber más</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Últimas publicaciones</h2>
            <Link href="/blog" className="text-sm underline underline-offset-4">Ver todo</Link>
          </div>
          <div className="mt-4 grid gap-4">
            {latest.map((p) => (
              <PostCard
                key={p.slug}
                title={p.title}
                description={p.description}
                date={p.date}
                tags={p.tags}
                slug={p.slug}
              />
            ))}
            {latest.length === 0 && (
              <p className="text-neutral-600 dark:text-neutral-400">Aún no hay publicaciones.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
