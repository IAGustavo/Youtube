type Props = {
  id: string; // CodePen slug hash
  title?: string;
  height?: number;
  themeId?: string; // e.g., "dark"
};

export default function CodePen({ id, title = "CodePen embed", height = 400, themeId = "dark" }: Props) {
  const src = `https://codepen.io/team/codepen/embed/${id}?default-tab=result&theme-id=${encodeURIComponent(
    themeId
  )}`;
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-neutral-800">
      <div className="relative w-full" style={{ paddingTop: `${(height / height) * 100}%`, minHeight: height }}>
        <iframe
          className="absolute left-0 top-0 h-full w-full"
          title={title}
          src={src}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
}
