import type { THUMB_SIZES } from './constants';

export interface SwitchProps {
  value?: boolean;
  thumbColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  size?: keyof typeof THUMB_SIZES;
  onChange?(value: boolean): void;
}
