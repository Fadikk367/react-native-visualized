import type React from 'react';
import type { FlexStyle } from 'react-native';

export interface FlexProps
  extends Pick<FlexStyle, 'alignItems' | 'justifyContent' | 'gap' | 'flex'> {
  children?: React.ReactNode;
  direction?: FlexStyle['flexDirection'];
}
