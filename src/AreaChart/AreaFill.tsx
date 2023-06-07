import React from 'react';

import { LinearGradient, Paint } from '@shopify/react-native-skia';

import type { AreaFillProps } from './types';

const AreaFill = ({ fill }: AreaFillProps) => {
  if (typeof fill === 'string') {
    return <Paint color={fill} style="fill" />;
  }

  return <LinearGradient {...fill} />;
};

export default AreaFill;
