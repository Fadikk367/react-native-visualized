interface OptionItem<T> {
  label: string;
  value: T;
}

export interface SlidingSelectProps<T> {
  value: OptionItem<T>;
  options: OptionItem<T>[];
  width: number;
  height?: number;
  onChange(v: OptionItem<T>): void;
}

export interface OptionItemProps {
  label: string;
  isActive: boolean;
  itemSize: number;
  height: number;
  onPress(): void;
}
