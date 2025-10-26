export type PostMeta = {
  title: string;
  description?: string;
  date: string; // ISO
  tags: string[];
  draft?: boolean;
  readingTimeMinutes: number;
  slug: string;
};

export type Post = PostMeta & {
  content: string; // raw MDX/MD
};

export type TagCount = Record<string, number>;
