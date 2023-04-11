import React from 'react';

import { Group } from '@shopify/react-native-skia';

import type { TranslateProps } from './types';

const Translate = ({ x = 0, y = 0, children }: TranslateProps) => {
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>{children}</Group>
  );
};

export default Translate;
