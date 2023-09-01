import React from 'react';

import { Canvas } from '@shopify/react-native-skia';

import type { ChartBaseProps } from '../types';
import Translate from './Translate/Translate';
import { defaultPadding } from './constants';
import { applyPadding, ensureDefaults } from './utils';

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
    const layout = applyPadding(width, height, padding);

    // TODO: Make use of it when clip prop will be introduced
    // const clipRect = rect(
    //   padding.left,
    //   padding.top,
    //   contentWidth,
    //   contentHeight,
    // );

    return (
      <Canvas style={{ width, height, backgroundColor }}>
        <Translate x={layout.x} y={layout.y}>
          <Chart
            {...chartProps}
            width={layout.width}
            height={layout.height}
            padding={padding}
          />
        </Translate>
      </Canvas>
    );
  };
}

export default withPadding;
