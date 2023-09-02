import type { ColorPickerProps as WheelColorPickerProps } from 'react-native-wheel-color-picker';

export interface ColorPickerProps extends WheelColorPickerProps {
  label: string;
  onColorPicked(color: string): void;
}
