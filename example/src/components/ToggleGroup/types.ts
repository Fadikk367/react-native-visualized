export interface ToggleGroupProps<T> {
  options: { value: T; icon: string }[];
  value?: T;
  onChange(value: T): void;
}

export interface OptionItem {
  icon: string;
  isActive: boolean;
  onPress(): void;
}
