import type { CSSProperties, KeyboardEvent } from 'react';
import type { MatchResult } from '../data/types';
import { NutritionLabel } from './NutritionLabel';
import styles from './RecipeCard.module.css';

interface RecipeCardProps {
  result: MatchResult;
  /** Position in the grid, used to stagger the entrance animation. */
  index: number;
  onOpen: (id: string) => void;
}

/** A result card: match badge, nutrition label and match progress bar. */
export function RecipeCard({ result, index, onOpen }: RecipeCardProps) {
  const { recipe, matched, total, ratio } = result;
  const pct = Math.round(ratio * 100);

  const open = () => onOpen(recipe.id);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  };

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.09}s` } as CSSProperties}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={handleKeyDown}
      aria-label={`${recipe.name}, есть ${matched} из ${total} продуктов. Открыть рецепт`}
    >
      <div className={styles.head}>
        <span className={styles.badge}>
          есть {matched} из {total}
        </span>
        <span className={styles.meta}>
          {recipe.time} мин · {recipe.diff}
        </span>
      </div>

      <h3 className={styles.name}>{recipe.name}</h3>
      <p className={styles.desc}>{recipe.desc}</p>

      <div className={styles.matchBar}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${pct}%` }} />
        </div>
        <span className={styles.matchPct}>{pct}%</span>
      </div>

      <NutritionLabel nutrition={recipe.nutrition} variant="card" />

      <div className={styles.open}>Открыть рецепт →</div>
    </article>
  );
}
