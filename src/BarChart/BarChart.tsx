import React from 'react';

import { Group, Line, SkPoint } from '@shopify/react-native-skia';

import { ensureDefaults, getIsWithinDomain } from '../core//utils';
import YAxis from '../core/Axes/YAxis';
import ChartContainer from '../core/ChartContainer/ChartContainer';
import { defaultPadding } from '../core/constants';
import AnimatedBar from './AnimatedBar';
import Bar from './Bar';
import BarLabel from './BarLabel';
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
  yAxisWidth = 40,
  showLines = false,
  padding: customPadding,
  backgroundColor,
  font,
  fontSize = 18,
  barColor,
  barRadius,
  renderBar,
}: BarChartProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const chartContentWidth = width - yAxisWidth - padding.right - padding.left;
  const barSpace = chartContentWidth / data.length;
  // TODO: when y domain is missing / set to auto determine based on data extremums
  const yDomainSize = yDomain[1] - yDomain[0];
  const labelsBarHeight = 30;
  const chartContentHeight =
    height - labelsBarHeight - padding.top - padding.bottom;

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

  const barLabels = data.map(({ label }, index) => {
    return (
      <Group key={label} transform={[{ translateX: barSpace * index }]}>
        <BarLabel
          label={label}
          space={barSpace}
          height={29}
          font={font}
          fontSize={fontSize}
        />
      </Group>
    );
  });

  return (
    <ChartContainer
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      padding={padding}>
      <YAxis
        ticks={yTicksWithinDomain}
        width={yAxisWidth}
        height={chartContentHeight}
        font={font}
        fontSize={fontSize}
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
        {barLabels}
      </Group>
    </ChartContainer>
  );
};

export default BarChart;
