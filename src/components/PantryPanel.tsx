import { IngredientInput } from './IngredientInput';
import { IngredientTag } from './IngredientTag';
import { SuggestionChip } from './SuggestionChip';
import styles from './PantryPanel.module.css';

interface PantryPanelProps {
  query: string;
  ingredients: string[];
  suggestions: string[];
  hint: string;
  onQueryChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (name: string) => void;
  onSelectSuggestion: (label: string) => void;
  onCook: () => void;
}

/** The "what's in your kitchen?" panel: input, tags, suggestions and CTA. */
export function PantryPanel({
  query,
  ingredients,
  suggestions,
  hint,
  onQueryChange,
  onAdd,
  onRemove,
  onSelectSuggestion,
  onCook,
}: PantryPanelProps) {
  return (
    <section className={styles.panel}>
      <label htmlFor="ingredient-input" className={styles.label}>
        Что есть дома?
      </label>
      <p className={styles.subtitle}>
        Впишите продукт и нажмите Enter, либо выберите из частых ниже.
      </p>

      <div className={styles.inputBlock}>
        <IngredientInput value={query} onChange={onQueryChange} onAdd={onAdd} />
      </div>

      <div className={styles.tagArea}>
        {ingredients.length > 0 ? (
          <div className={styles.tags}>
            {ingredients.map((name, index) => (
              <IngredientTag key={name} name={name} index={index} onRemove={onRemove} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Пока пусто — добавьте хотя бы один продукт.</p>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          <div className={styles.suggestionsTitle}>Частые продукты</div>
          <div className={styles.suggestionList}>
            {suggestions.map((label) => (
              <SuggestionChip key={label} label={label} onSelect={onSelectSuggestion} />
            ))}
          </div>
        </div>
      )}

      <div className={styles.cookBlock}>
        <button type="button" className={styles.cook} onClick={onCook}>
          Готовить →
        </button>
        {hint && <p className={styles.hint}>{hint}</p>}
      </div>
    </section>
  );
}
