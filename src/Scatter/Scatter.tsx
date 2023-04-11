import React from 'react';

import ChartContainer from '../core/ChartContainer';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
import type { ScatterProps } from './types';

const Scatter = ({
  width,
  height,
  padding: customPadding,
  backgroundColor,
}: ScatterProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  return (
    <ChartContainer
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}
    />
  );
};

export default Scatter;
