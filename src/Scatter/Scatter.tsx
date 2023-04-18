import React from 'react';

import type { SkPoint } from '@shopify/react-native-skia';
import { interpolateColor } from 'react-native-reanimated';

import XAxis from '../core/Axes/XAxis';
import YAxis from '../core/Axes/YAxis';
import ChartContainer from '../core/ChartContainer';
import Gridlines from '../core/Gridlines';
import Translate from '../core/Translate/Translate';
import { defaultPadding } from '../core/constants';
import { ensureDefaults, getIsWithinDomain } from '../core/utils';
import ContinuousColorLegend from './Legend/ContinuousColorLegend';
import Legend from './Legend/Legend';
import Marker from './Marker';
import { gridlinesDefaults } from './constants';
import type { ScatterPoint, ScatterProps } from './types';

const Scatter = <T extends ScatterPoint>({
  width,
  height,
  xDomain,
  yDomain,
  valueDomain,
  valueDomainColors,
  xTicks,
  yTicks,
  data,
  font,
  padding: customPadding,
  legend: legendsConfig,
  marker: markerConfig,
  renderMarker: CustomMarker,
  gridlines: gridlinesConfig = gridlinesDefaults,
  showContinuousLegend = false,
  backgroundColor,
}: ScatterProps<T>) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const yAxisWidth = 30;
  const xAxisHeight = 30;
  const colorLegendWidth = showContinuousLegend ? 40 : 0;
  const legendHeight = legendsConfig ? legendsConfig.height || 30 : 0;
  const contentWidth =
    width - (padding.left + yAxisWidth + colorLegendWidth + padding.right);
  const contentHeight =
    height - (padding.top + legendHeight + xAxisHeight + padding.bottom);
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

  const getMarkerColor = ({ color, value }: T): string | undefined => {
    if (color) return color;

    if (markerConfig?.color) return markerConfig.color;

    if (value && valueDomain && valueDomainColors) {
      return interpolateColor(value, valueDomain, valueDomainColors);
    }

    return undefined;
  };

  const markers = data.map(point => {
    const key = `${point.x}-${point.y}`;
    return CustomMarker ? (
      <CustomMarker key={key} {...point} mapDomainToProps={mapDomainToCanvas} />
    ) : (
      <Marker
        key={key}
        {...point}
        {...markerConfig}
        color={getMarkerColor(point)}
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
      <Translate x={yAxisWidth}>
        {legendsConfig && (
          <Legend {...legendsConfig} width={contentWidth} font={font} />
        )}
      </Translate>
      <Translate y={legendHeight}>
        <YAxis
          ticks={yTicksWithinDomain}
          width={yAxisWidth}
          height={contentHeight}
          font={font}
          fontSize={18}
          mapDomainToCanvas={mapDomainToCanvas}
        />
        <Translate x={yAxisWidth}>
          {gridlinesConfig !== null && (
            <Gridlines
              {...gridlinesConfig}
              xTicks={xTicks}
              yTicks={yTicks}
              xDomain={xDomain}
              yDomain={yDomain}
              mapDomainToCanvas={mapDomainToCanvas}
            />
          )}

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
        <Translate x={contentWidth + yAxisWidth}>
          {showContinuousLegend && (
            <ContinuousColorLegend
              colors={['lightskyblue', 'darkblue']}
              domain={[0, 50]}
              height={contentHeight}
              width={colorLegendWidth}
              ticks={[0, 10, 20, 30, 40, 50]}
              font={font}
            />
          )}
        </Translate>
      </Translate>
    </ChartContainer>
  );
};

export default Scatter;
