/** Approximate reading time from Markdown body (no frontmatter). */
export function readingTimeMinutes(body: string, wordsPerMinute = 200): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}
