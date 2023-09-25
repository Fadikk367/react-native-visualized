import React from 'react';

import { Group, Line, SkPoint } from '@shopify/react-native-skia';

import { getIsWithinDomain } from '../core//utils';
import YAxis from '../core/Axes/YAxis';
import withPadding from '../core/withPadding';
import AnimatedBar from './AnimatedBar';
import Bar from './Bar';
import BarLabels from './BarLabels';
import LabelsLines from './LabelsLines';
import type { BarChartProps } from './types';

const BarChart = ({
  width,
  height,
  data,
  yDomain,
  yTicks,
  animated = false,
  barRatio = 0.9,
  showLines = false,
  font,
  fontSize = 12,
  barColor,
  barRadius,
  yAxis,
  renderBar,
}: BarChartProps) => {
  const yAxisWidth = yAxis?.width || 40;
  const chartContentWidth = width - yAxisWidth;
  const barSpace = chartContentWidth / data.length;
  // TODO: when y domain is missing / set to auto determine based on data extremums
  const yDomainSize = yDomain[1] - yDomain[0];
  const labelsBarHeight = 30;
  const chartContentHeight = height - labelsBarHeight;

  const yTicksWithinDomain = yTicks.filter(getIsWithinDomain(yDomain));

  const mapDomainToCanvas = (domainValue: number) => {
    return (chartContentHeight / yDomainSize) * domainValue;
  };

  // Temporary solution to conform to YAxis interface
  const mapDomainToCanvas2D = (point: SkPoint) => {
    return {
      x: 0,
      y:
        chartContentHeight -
        (chartContentHeight / yDomainSize) * (point.y - yDomain[0]),
    };
  };

  let BarComponent = animated ? AnimatedBar : Bar;
  if (renderBar) {
    BarComponent = renderBar;
  }

  const bars = data.map(({ value }, index) => (
    <Group
      key={index}
      origin={{
        x: barSpace * index + barSpace / 2,
        y: height / 2,
      }}
      transform={[{ rotate: Math.PI }]}>
      <Group
        transform={[
          { translateX: barSpace * index },
          { translateY: height - chartContentHeight },
        ]}>
        <BarComponent
          value={value}
          space={barSpace}
          ratio={barRatio}
          base={yDomain[0]}
          color={barColor}
          radius={barRadius}
          font={font}
          mapDomainToCanvas={mapDomainToCanvas}
        />
      </Group>
    </Group>
  ));

  return (
    <>
      <YAxis
        ticks={yTicksWithinDomain}
        width={yAxisWidth}
        height={chartContentHeight}
        font={font}
        {...yAxis}
        mapDomainToCanvas={mapDomainToCanvas2D}
      />
      <Group
        transform={[
          { translateX: yAxisWidth },
          { translateY: mapDomainToCanvas(yDomain[0]) },
        ]}>
        {showLines && (
          <LabelsLines
            labels={yTicks}
            height={chartContentHeight}
            mapDomainToCanvas={mapDomainToCanvas}
            width={chartContentWidth}
          />
        )}
        {bars}
      </Group>
      <Line
        p1={{ x: yAxisWidth, y: chartContentHeight }}
        p2={{ x: chartContentWidth + yAxisWidth, y: chartContentHeight }}
        strokeWidth={1}
      />
      <Group
        transform={[
          { translateX: yAxisWidth },
          { translateY: chartContentHeight },
        ]}>
        <BarLabels
          data={data}
          fontSize={fontSize}
          font={font}
          barSpace={barSpace}
        />
      </Group>
    </>
  );
};

export default withPadding(BarChart) as (props: BarChartProps) => JSX.Element;
