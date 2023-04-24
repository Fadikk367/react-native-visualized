import React from 'react';

import { Circle } from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
import type { ProgressRingProps } from './types';

const ProgressRing = ({
  width,
  height,
  padding: customPadding,
  backgroundColor,
}: ProgressRingProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);

  return (
    <ChartContainer
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}>
      <Circle cx={100} cy={100} r={50} color="red" />
    </ChartContainer>
  );
};

export default ProgressRing;
