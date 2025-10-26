type Props = { src: string; alt?: string; caption?: string };

export default function Img({ src, alt = "", caption }: Props) {
  return (
    <figure className="my-6">
      <img src={src} alt={alt} className="w-full rounded-lg border border-neutral-200/60 dark:border-neutral-800" />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-neutral-500">{caption}</figcaption>
      )}
    </figure>
  );
}
