import type { ReactNode } from "react";

type Props = {
  type?: "info" | "success" | "warning" | "danger";
  title?: string;
  children?: ReactNode;
};

const styles: Record<NonNullable<Props["type"]>, string> = {
  info: "border-blue-500/40 bg-blue-500/10 text-blue-200",
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  danger: "border-rose-500/40 bg-rose-500/10 text-rose-200",
};

export default function Callout({ type = "info", title, children }: Props) {
  const cls = styles[type];
  return (
    <div className={`my-6 rounded-lg border px-4 py-3 prose-p:my-2 ${cls}`} role="note" aria-label={title ?? type}>
      {title ? <div className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-80">{title}</div> : null}
      <div className="prose-invert max-w-none">{children}</div>
    </div>
  );
}
