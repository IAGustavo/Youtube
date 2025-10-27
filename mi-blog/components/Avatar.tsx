import Image from "next/image";
import type { ComponentProps } from "react";

type Props = {
  src?: string;
  name: string;
  subtitle?: string;
  size?: number;
  rounded?: boolean;
} & Omit<ComponentProps<typeof Image>, "src" | "alt" | "width" | "height">;

export default function Avatar({ src, name, subtitle, size = 40, rounded = true, ...imgProps }: Props) {
  const initials = getInitials(name);
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex items-center justify-center overflow-hidden bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
        style={{ width: size, height: size, borderRadius: rounded ? "9999px" : "8px" }}
        aria-label={name}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            width={size}
            height={size}
            className="h-full w-full object-cover"
            {...imgProps}
          />
        ) : (
          <span className="text-xs font-semibold" aria-hidden>
            {initials}
          </span>
        )}
      </div>
      <div className="leading-tight">
        <div className="text-sm font-medium">{name}</div>
        {subtitle ? <div className="text-xs text-neutral-600 dark:text-neutral-400">{subtitle}</div> : null}
      </div>
    </div>
  );
}

function getInitials(n: string): string {
  const parts = n.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}
