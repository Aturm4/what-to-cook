import type { KeyboardEvent } from 'react';
import styles from './IngredientInput.module.css';

interface IngredientInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Called when the user commits the current value (Enter or the + button). */
  onAdd: () => void;
}

/** Text field + square add button for entering a pantry ingredient. */
export function IngredientInput({ value, onChange, onAdd }: IngredientInputProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onAdd();
    }
  };

  return (
    <div className={styles.row}>
      <input
        id="ingredient-input"
        type="text"
        className={styles.field}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="например, картофель"
        autoComplete="off"
      />
      <button
        type="button"
        className={styles.add}
        onClick={onAdd}
        aria-label="Добавить продукт"
      >
        +
      </button>
    </div>
  );
}
