import styles from './SuggestionChip.module.css';

interface SuggestionChipProps {
  label: string;
  onSelect: (label: string) => void;
}

/** Ghost chip for a common pantry staple; adds it to the list on click. */
export function SuggestionChip({ label, onSelect }: SuggestionChipProps) {
  return (
    <button type="button" className={styles.chip} onClick={() => onSelect(label)}>
      + {label}
    </button>
  );
}
