export function deriveBullets(text: string, max = 3): string[] {
  const cleaned = (text || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return [];

  const parts = cleaned
    .split(/[\.\;\:\!\?]\s+/)
    .map(s => s.trim())
    .filter(s => s.length >= 16);

  const bullets = parts.slice(0, max);
  return bullets.length ? bullets : [cleaned].slice(0, max);
}
