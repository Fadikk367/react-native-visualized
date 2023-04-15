import React from 'react';

import type { SkPoint } from '@shopify/react-native-skia';

import XAxis from '../core/Axes/XAxis';
import YAxis from '../core/Axes/YAxis';
import ChartContainer from '../core/ChartContainer';
import Gridlines from '../core/Gridlines';
import Translate from '../core/Translate/Translate';
import { defaultPadding } from '../core/constants';
import { ensureDefaults, getIsWithinDomain } from '../core/utils';
import Marker from './Marker';
import { gridlinesDefaults } from './constants';
import type { ScatterProps } from './types';

const Scatter = ({
  width,
  height,
  xDomain,
  yDomain,
  xTicks,
  yTicks,
  data,
  font,
  padding: customPadding,
  marker: markerConfig,
  renderMarker: CustomMarker,
  gridlines: gridlinesConfig = gridlinesDefaults,
  backgroundColor,
}: ScatterProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const yAxisWidth = 30;
  const xAxisHeight = 30;
  const contentWidth = width - (padding.left + yAxisWidth + padding.right);
  const contentHeight = height - (padding.top + xAxisHeight + padding.bottom);
  const yDomainSize = Math.abs(yDomain[1] - yDomain[0]);
  const xDomainSize = Math.abs(xDomain[1] - xDomain[0]);

  const xTicksWithinDomain = xTicks.filter(getIsWithinDomain(xDomain));
  const yTicksWithinDomain = yTicks.filter(getIsWithinDomain(yDomain));

  const mapDomainToCanvas = ({ x, y }: SkPoint): SkPoint => {
    return {
      x: (contentWidth / xDomainSize) * (x - xDomain[0]),
      y: contentHeight - (contentHeight / yDomainSize) * (y - yDomain[0]),
    };
  };

  const markers = data.map(point => {
    return CustomMarker ? (
      <CustomMarker {...point} mapDomainToProps={mapDomainToCanvas} />
    ) : (
      <Marker
        {...point}
        {...markerConfig}
        mapDomainToCanvas={mapDomainToCanvas}
      />
    );
  });

  return (
    <ChartContainer
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}>
      <YAxis
        ticks={yTicksWithinDomain}
        width={yAxisWidth}
        height={contentHeight}
        font={font}
        fontSize={18}
        mapDomainToCanvas={mapDomainToCanvas}
      />
      <Translate x={yAxisWidth}>
        <Gridlines
          {...gridlinesConfig}
          xTicks={xTicks}
          yTicks={yTicks}
          xDomain={xDomain}
          yDomain={yDomain}
          mapDomainToCanvas={mapDomainToCanvas}
        />
        {markers}
      </Translate>
      <Translate x={yAxisWidth} y={contentHeight}>
        <XAxis
          ticks={xTicksWithinDomain}
          width={contentWidth}
          height={xAxisHeight}
          font={font}
          fontSize={18}
          mapDomainToCanvas={mapDomainToCanvas}
        />
      </Translate>
    </ChartContainer>
  );
};

export default Scatter;
