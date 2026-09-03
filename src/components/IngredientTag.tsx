import styles from './IngredientTag.module.css';

/** Rotations cycled through by tag index for the stuck-on-sticker effect. */
const ROTATIONS = [-3, 2.2, -1.4, 3, -2.4, 1.6];

interface IngredientTagProps {
  name: string;
  index: number;
  onRemove: (name: string) => void;
}

/** A user-added ingredient rendered as a rotated price tag. */
export function IngredientTag({ name, index, onRemove }: IngredientTagProps) {
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <span className={styles.tag} style={{ transform: `rotate(${rotation}deg)` }}>
      <span aria-hidden="true" className={styles.hole} />
      <span>{name}</span>
      <button
        type="button"
        className={styles.remove}
        onClick={() => onRemove(name)}
        aria-label={`Удалить: ${name}`}
      >
        ×
      </button>
    </span>
  );
}
