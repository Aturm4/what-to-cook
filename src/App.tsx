import { useCallback, useMemo, useState } from 'react';
import { PantryPanel } from './components/PantryPanel';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { recipes } from './data/recipes';
import { commonIngredients } from './data/suggestions';
import type { MatchResult } from './data/types';
import { matchRecipes } from './lib/matching';
import { normalize, pluralizeDishes } from './lib/text';
import styles from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cooked, setCooked] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hint, setHint] = useState('');

  const addIngredient = useCallback((raw: string) => {
    const name = raw.trim();
    if (!name) return;
    setIngredients((current) => {
      const exists = current.some((item) => normalize(item) === normalize(name));
      return exists ? current : [...current, name];
    });
    setQuery('');
    setHint('');
  }, []);

  const removeIngredient = useCallback((name: string) => {
    setIngredients((current) => current.filter((item) => item !== name));
  }, []);

  const cook = useCallback(() => {
    if (ingredients.length === 0) {
      setHint('Добавьте хотя бы один продукт, чтобы подобрать блюда.');
      return;
    }
    setResults(matchRecipes(ingredients, recipes));
    setCooked(true);
    setHint('');
  }, [ingredients]);

  // Hide staples the user has already added.
  const suggestions = useMemo(
    () =>
      commonIngredients.filter(
        (staple) => !ingredients.some((item) => normalize(item) === normalize(staple)),
      ),
    [ingredients],
  );

  const expandedRecipe = useMemo(
    () => recipes.find((recipe) => recipe.id === expandedId) ?? null,
    [expandedId],
  );

  const count = results.length;
  const hasResults = count > 0;
  const resultsHeading = hasResults
    ? `Нашлось ${count} ${pluralizeDishes(count)}`
    : 'Ничего не нашлось';

  return (
    <div className={styles.page}>
      <div aria-hidden="true" className={styles.texture} />

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.kicker}>Фермерская кухня</div>
          <h1 className={styles.title}>
            Что приготовить
            <br />
            из того, что есть
          </h1>
          <div className={styles.underline} />
          <p className={styles.lede}>
            Впишите продукты, которые лежат в холодильнике, — соберём блюда, которые
            получится приготовить прямо сейчас, с точным КБЖУ на порцию.
          </p>
        </header>

        <PantryPanel
          query={query}
          ingredients={ingredients}
          suggestions={suggestions}
          hint={hint}
          onQueryChange={setQuery}
          onAdd={() => addIngredient(query)}
          onRemove={removeIngredient}
          onSelectSuggestion={addIngredient}
          onCook={cook}
        />

        {cooked && (
          <section className={styles.results}>
            <div className={styles.resultsHead}>
              <h2 className={styles.resultsHeading}>{resultsHeading}</h2>
              {hasResults && <span className={styles.resultsSub}>по вашим продуктам</span>}
            </div>

            {hasResults ? (
              <div className={styles.grid}>
                {results.map((result, index) => (
                  <RecipeCard
                    key={result.recipe.id}
                    result={result}
                    index={index}
                    onOpen={setExpandedId}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyTitle}>Пока ничего не сложилось</div>
                <p className={styles.emptyText}>
                  Добавьте ещё пару базовых продуктов — например, яйца, картофель или
                  курицу — и попробуйте снова.
                </p>
              </div>
            )}
          </section>
        )}
      </div>

      {expandedRecipe && (
        <RecipeModal recipe={expandedRecipe} onClose={() => setExpandedId(null)} />
      )}
    </div>
  );
}
