import fs from "node:fs/promises";
import path from "node:path";

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

const GALLERY_JSON = path.join(process.cwd(), "content", "gallery.json");

export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const raw = await fs.readFile(GALLERY_JSON, "utf8");
    const data = JSON.parse(raw) as GalleryItem[];
    return data;
  } catch {
    return [];
  }
}
