import type { THUMB_SIZES } from './constants';

export interface SliderProps {
  activeTrackColor?: string;
  inactiveTrackColor?: string;
  thumbColor?: string;
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
  size?: keyof typeof THUMB_SIZES;
  onSlidingComplete?(value: number): void;
  onSlidingBegin?(value: number): void;
  onValueChange?(value: number): void;
}
