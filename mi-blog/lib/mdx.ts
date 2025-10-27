import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import type { Post, PostMeta, TagCount } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const Frontmatter = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.union([z.string(), z.date()]),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().optional(),
  ogImage: z.string().optional(),
});

export async function getPostSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts: Post[] = [];
  for (const file of slugs) {
    const full = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(full, "utf8");
    const { content, data } = matter(raw);
    const parsed = Frontmatter.parse(data);
    const slug = file.replace(/\.(mdx|md)$/i, "");
    const rt = readingTime(content);
    const meta: PostMeta = {
      title: parsed.title,
      description: parsed.description,
      date: new Date(parsed.date).toISOString(),
      tags: parsed.tags.map(slugify),
      draft: parsed.draft ?? false,
      readingTimeMinutes: Math.max(1, Math.round(rt.minutes)),
      slug,
    };
    if (!meta.draft) {
      posts.push({ ...meta, content });
    }
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(raw);
    const parsed = Frontmatter.parse(data);
    const rt = readingTime(content);
    const meta: PostMeta = {
      title: parsed.title,
      description: parsed.description,
      date: new Date(parsed.date).toISOString(),
      tags: parsed.tags.map(slugify),
      draft: parsed.draft ?? false,
      readingTimeMinutes: Math.max(1, Math.round(rt.minutes)),
      slug,
      ogImage: parsed.ogImage,
    };
    if (meta.draft) return null;
    const html = await renderMarkdownToHtml(content);
    return { ...meta, content: html };
  } catch {
    const filePath = path.join(POSTS_DIR, `${slug}.md`);
    try {
      const raw = await fs.readFile(filePath, "utf8");
      const { content, data } = matter(raw);
      const parsed = Frontmatter.parse(data);
      const rt = readingTime(content);
      const meta: PostMeta = {
        title: parsed.title,
        description: parsed.description,
        date: new Date(parsed.date).toISOString(),
        tags: parsed.tags.map(slugify),
        draft: parsed.draft ?? false,
        readingTimeMinutes: Math.max(1, Math.round(rt.minutes)),
        slug,
        ogImage: parsed.ogImage,
      };
      if (meta.draft) return null;
      const html = await renderMarkdownToHtml(content);
      return { ...meta, content: html };
    } catch {
      return null;
    }
  }
}

export async function getTagCounts(): Promise<TagCount> {
  const posts = await getAllPosts();
  const map: TagCount = {};
  for (const p of posts) {
    for (const t of p.tags) {
      map[t] = (map[t] ?? 0) + 1;
    }
  }
  return map;
}
