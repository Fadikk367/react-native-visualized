import React from 'react';

import { Canvas } from '@shopify/react-native-skia';

import type { ChartBaseProps } from '../types';
import Translate from './Translate/Translate';
import { defaultPadding } from './constants';
import { ensureDefaults } from './utils';

function withPadding<T extends ChartBaseProps>(Chart: React.FC<T>) {
  return <U,>({
    width,
    height,
    padding: customPadding,
    backgroundColor,
    ...chartProps
  }: // @ts-ignore
  T<U>) => {
    const padding = ensureDefaults(customPadding, defaultPadding);
    const horizontalPadding = padding.left + padding.right;
    const verticalPadding = padding.top + padding.bottom;
    const contentWidth = width - horizontalPadding;
    const contentHeight = height - verticalPadding;

    // TODO: Make use of it when clip prop will be introduced
    // const clipRect = rect(
    //   padding.left,
    //   padding.top,
    //   contentWidth,
    //   contentHeight,
    // );

    return (
      <Canvas style={{ width, height, backgroundColor }}>
        <Translate x={padding.left} y={padding.top}>
          <Chart
            {...chartProps}
            width={contentWidth}
            height={contentHeight}
            padding={padding}
          />
        </Translate>
      </Canvas>
    );
  };
}

export default withPadding;
