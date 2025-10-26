type Props = { id?: string; url?: string; title?: string };

export default function YouTube({ id, url, title = "YouTube video" }: Props) {
  const videoId = id ?? extractId(url ?? "");
  if (!videoId) return null;
  const src = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-lg border border-neutral-200/60 dark:border-neutral-800">
      <iframe
        className="h-full w-full"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

function extractId(input: string): string | null {
  if (!input) return null;
  try {
    const u = new URL(input);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    return null;
  } catch {
    return null;
  }
}
