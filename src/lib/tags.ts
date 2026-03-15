export function parseTags(raw: string): string[] {
  return [...new Set(raw.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean))]
}

export function toTagInput(tags: string[]): string {
  return tags.join(', ')
}
