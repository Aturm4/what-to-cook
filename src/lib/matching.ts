import type { MatchResult, Recipe } from '../data/types';
import { normalize } from './text';

export type SortMode = 'match' | 'fast';

/** Default number of top results surfaced to the user. */
export const DEFAULT_RESULT_LIMIT = 4;

/**
 * Loose token comparison: exact match after normalisation, or a shared
 * 3-character prefix. The prefix rule forgives declensions and plurals
 * (яйца/яйцо, помидоры/помидор, морковь/морковка).
 */
export function tokensMatch(userToken: string, recipeToken: string): boolean {
  const u = normalize(userToken);
  const r = normalize(recipeToken);
  if (!u || !r) return false;
  if (u === r) return true;
  if (u.length >= 3 && r.length >= 3 && u.slice(0, 3) === r.slice(0, 3)) {
    return true;
  }
  return false;
}

/** Count how many of a recipe's key ingredients the user has on hand. */
export function countMatches(ingredients: string[], recipe: Recipe): number {
  return recipe.match.filter((recipeToken) =>
    ingredients.some((userToken) => tokensMatch(userToken, recipeToken)),
  ).length;
}

/**
 * Score every recipe against the user's ingredients, keep those with at
 * least one match, and sort by relevance. Returns the top `limit` results.
 *
 * Sort order:
 *  - 'match' (default): by match ratio desc, then match count desc, then time asc.
 *  - 'fast': fastest recipes first, tie-broken by the same relevance rules.
 */
export function matchRecipes(
  ingredients: string[],
  recipes: Recipe[],
  { sortMode = 'match', limit = DEFAULT_RESULT_LIMIT }: { sortMode?: SortMode; limit?: number } = {},
): MatchResult[] {
  const scored: MatchResult[] = recipes
    .map((recipe) => {
      const matched = countMatches(ingredients, recipe);
      const total = recipe.match.length;
      return { recipe, matched, total, ratio: total ? matched / total : 0 };
    })
    .filter((result) => result.matched >= 1);

  scored.sort((a, b) => {
    if (sortMode === 'fast' && a.recipe.time !== b.recipe.time) {
      return a.recipe.time - b.recipe.time;
    }
    if (b.ratio !== a.ratio) return b.ratio - a.ratio;
    if (b.matched !== a.matched) return b.matched - a.matched;
    return a.recipe.time - b.recipe.time;
  });

  return scored.slice(0, limit);
}
