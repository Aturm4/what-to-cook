export type Difficulty = 'Просто' | 'Средне' | 'Сложно';

/** A single ingredient line as shown in the full recipe. */
export interface RecipeIngredient {
  name: string;
  /** Human-readable amount, e.g. "150 г" or "3 шт". */
  amount: string;
}

/** Nutrition facts per serving. */
export interface Nutrition {
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface Recipe {
  id: string;
  name: string;
  desc: string;
  /** Cooking time in minutes. */
  time: number;
  diff: Difficulty;
  /** Human-readable serving count, e.g. "2 порции". */
  servings: string;
  /**
   * Key ingredients used to match a recipe against the user's pantry.
   * Kept separate from `ingredients` so the matching logic never depends
   * on presentation fields and can be swapped for a real backend query.
   */
  match: string[];
  nutrition: Nutrition;
  ingredients: RecipeIngredient[];
  steps: string[];
}

/** Result of scoring a recipe against the user's ingredients. */
export interface MatchResult {
  recipe: Recipe;
  /** How many of the recipe's key ingredients the user has. */
  matched: number;
  /** Total number of key ingredients. */
  total: number;
  /** matched / total, in the range [0, 1]. */
  ratio: number;
}
