/**
 * Normalise an ingredient token for comparison:
 * lowercase, trimmed, and with «ё» folded to «е».
 */
export function normalize(value: string): string {
  return String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/ё/g, 'е');
}

/**
 * Russian plural form of «блюдо» (dish) for a given count.
 * 1 блюдо · 2–4 блюда · 5–20 блюд …
 */
export function pluralizeDishes(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return 'блюдо';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'блюда';
  return 'блюд';
}
