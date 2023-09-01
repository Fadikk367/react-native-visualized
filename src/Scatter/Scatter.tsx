import React from 'react';

import type { SkPoint } from '@shopify/react-native-skia';
import { interpolateColor } from 'react-native-reanimated';

import XAxis from '../core/Axes/XAxis';
import YAxis from '../core/Axes/YAxis';
import Gridlines from '../core/Gridlines';
import Legend from '../core/Legend';
import { defaultLegendConfig } from '../core/Legend/constants';
import Translate from '../core/Translate';
import { ensureDefaults, getIsWithinDomain } from '../core/utils';
import withPadding from '../core/withPadding';
import ContinuousColorLegend from './Legend/ContinuousColorLegend';
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
  legend: customLegendConfig,
  xAxis,
  yAxis,
  marker: markerConfig,
  renderMarker: CustomMarker,
  gridlines: gridlinesConfig = gridlinesDefaults,
  showContinuousLegend = false,
}: ScatterProps<T>) => {
  // FIXME: Fix when working on simple layout engine - at this point we should not care about the marker
  // @ts-expect-error
  const legendConfig = ensureDefaults(customLegendConfig, defaultLegendConfig);
  const yAxisWidth = yAxis?.width || 30;
  const xAxisHeight = xAxis?.height || 30;
  const colorLegendWidth = showContinuousLegend ? 40 : 0;
  const contentWidth = width - (yAxisWidth + colorLegendWidth);
  const contentHeight = height - (legendConfig.height + xAxisHeight);
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
    <>
      <Translate x={yAxisWidth}>
        {customLegendConfig && (
          <Legend {...legendConfig} width={contentWidth} font={font} />
        )}
      </Translate>
      <Translate y={legendConfig.height}>
        <YAxis
          ticks={yTicksWithinDomain}
          width={yAxisWidth}
          height={contentHeight}
          font={font}
          {...yAxis}
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
            {...xAxis}
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
    </>
  );
};

export default withPadding(Scatter);
