import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDateISO } from "@/lib/utils";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import YouTube from "@/components/mdx/YouTube";
import Img from "@/components/mdx/Img";
import Quote from "@/components/mdx/Quote";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <div className="text-sm text-neutral-500 flex items-center gap-3">
          <time dateTime={post.date}>{formatDateISO(post.date)}</time>
          <span>•</span>
          <span>{post.readingTimeMinutes} min</span>
        </div>
        {post.description && (
          <p className="text-neutral-600 dark:text-neutral-400">{post.description}</p>
        )}
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((t) => (
            <Link key={t} href={`/tags/${t}`} className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              #{t}
            </Link>
          ))}
        </div>
      </header>
      <hr className="my-8 border-neutral-200/60 dark:border-neutral-800" />
      <div className="prose dark:prose-invert max-w-none">
        {/* Renderizar MDX desde string con next-mdx-remote */}
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
            },
          }}
          components={{ YouTube, Img, Quote }}
        />
      </div>
    </article>
  );
}
