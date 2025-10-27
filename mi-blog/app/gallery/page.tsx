import GalleryGrid from "@/components/GalleryGrid";
import { getGallery } from "@/lib/gallery";

export const metadata = {
  title: "Galería",
  description: "Imágenes y momentos.",
};

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Galería</h1>
      <p className="mt-2 text-neutral-400">Haz clic en una imagen para verla en grande.</p>
      <div className="mt-6">
        <GalleryGrid items={items} />
      </div>
    </section>
  );
}
