export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function formatDateISO(date: string): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0] ?? date;
}
