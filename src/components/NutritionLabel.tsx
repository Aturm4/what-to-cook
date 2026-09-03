import type { Nutrition } from '../data/types';
import styles from './NutritionLabel.module.css';

interface NutritionLabelProps {
  nutrition: Nutrition;
  /** 'card' is the compact variant; 'modal' is the larger one in the recipe view. */
  variant?: 'card' | 'modal';
}

/** Packaging-style nutrition label, redrawn in the chalky brand style. */
export function NutritionLabel({ nutrition, variant = 'card' }: NutritionLabelProps) {
  const className = variant === 'modal' ? `${styles.label} ${styles.modal}` : styles.label;

  return (
    <div className={className}>
      <div className={styles.header}>
        <span className={styles.title}>Пищевая ценность</span>
        <span className={styles.per}>на порцию</span>
      </div>
      <div className={styles.rule} />
      <div className={styles.calories}>
        <span className={styles.caloriesLabel}>Калории</span>
        <span className={styles.caloriesValue}>{nutrition.kcal}</span>
      </div>
      <div className={styles.rule} />
      <div className={styles.row}>
        <span>Белки</span>
        <span className={styles.value}>{nutrition.protein} г</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.row}>
        <span>Жиры</span>
        <span className={styles.value}>{nutrition.fat} г</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.row}>
        <span>Углеводы</span>
        <span className={styles.value}>{nutrition.carbs} г</span>
      </div>
    </div>
  );
}
