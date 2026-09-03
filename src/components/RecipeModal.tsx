import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import type { Recipe } from '../data/types';
import { NutritionLabel } from './NutritionLabel';
import styles from './RecipeModal.module.css';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

/** Full-recipe dialog: ingredients, numbered steps and nutrition facts. */
export function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on Escape, lock background scroll, and focus the close button.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const stop = (event: MouseEvent) => event.stopPropagation();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={recipe.name}
        onClick={stop}
      >
        <button
          type="button"
          ref={closeRef}
          className={styles.close}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>

        <span className={styles.kicker}>
          {recipe.diff} · {recipe.time} мин · {recipe.servings}
        </span>
        <h2 className={styles.name}>{recipe.name}</h2>
        <p className={styles.desc}>{recipe.desc}</p>

        <div className={styles.body}>
          <section>
            <h3 className={styles.sectionTitle}>Ингредиенты</h3>
            <div className={styles.ingredients}>
              {recipe.ingredients.map((ingredient) => (
                <div className={styles.ingredient} key={ingredient.name}>
                  <span className={styles.ingredientName}>{ingredient.name}</span>
                  <span className={styles.leader} />
                  <span className={styles.amount}>{ingredient.amount}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className={styles.sectionTitle}>Приготовление</h3>
            <ol className={styles.steps}>
              {recipe.steps.map((step, index) => (
                <li className={styles.step} key={step}>
                  <span className={styles.stepNum}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.stepText}>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <NutritionLabel nutrition={recipe.nutrition} variant="modal" />
        </div>
      </div>
    </div>
  );
}
