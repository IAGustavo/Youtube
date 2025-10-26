import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import type { Post, PostMeta, TagCount } from "@/lib/types";
import { slugify } from "@/lib/utils";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const Frontmatter = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.union([z.string(), z.date()]),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().optional(),
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

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const file = `${slug}.mdx`;
  const alt = `${slug}.md`;
  for (const name of [file, alt]) {
    try {
      const full = path.join(POSTS_DIR, name);
      const raw = await fs.readFile(full, "utf8");
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
      };
      if (meta.draft) return null;
      return { ...meta, content };
    } catch {
      // try next extension
    }
  }
  return null;
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
