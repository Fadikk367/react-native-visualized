import React from 'react';

import { Canvas, Group, Line } from '@shopify/react-native-skia';

import AnimatedBar from './AnimatedBar';
import Bar from './Bar';
import BarLabel from './BarLabel';
import LabelsLines from './LabelsLines';
import YLabels from './YLabels';
import { defaultPadding } from './constants';
import type { BarChartProps } from './types';
import { ensureDefaults } from './utils';

const BarChart = ({
  width,
  height,
  data,
  yDomain,
  yLabels,
  animated = false,
  barRatio = 0.9,
  yLabelsWidth = 40,
  showLines = false,
  padding: customPadding = {},
  backgroundColor = 'transparent',
  font,
  renderBar,
}: BarChartProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const chartContentWidth = width - yLabelsWidth - padding.right - padding.left;
  const barSpace = chartContentWidth / data.length;
  // TODO: when y domain is missing / set to auto determine based on data extremums
  const yDomainSize = yDomain[1] - yDomain[0];
  const labelsBarHeight = 30;
  const chartContentHeight =
    height - labelsBarHeight - padding.top - padding.bottom;
  const barPadding = (barSpace - barSpace * barRatio) / 2;

  const mapDomainToCanvas = (domainValue: number) => {
    return (chartContentHeight / yDomainSize) * domainValue;
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
          padding={barPadding}
          base={yDomain[0]}
          mapDomainToCanvas={mapDomainToCanvas}
        />
      </Group>
    </Group>
  ));

  const barLabels = data.map(({ label }, index) => {
    return (
      <Group key={label} transform={[{ translateX: barSpace * index }]}>
        <BarLabel label={label} space={barSpace} height={29} font={font} />
      </Group>
    );
  });

  return (
    <Canvas style={{ width, height, backgroundColor }}>
      <Group
        transform={[{ translateX: padding.left }, { translateY: padding.top }]}>
        <Group transform={[{ translateY: mapDomainToCanvas(yDomain[0]) }]}>
          <YLabels
            labels={yLabels}
            width={yLabelsWidth}
            height={chartContentHeight}
            domain={yDomain}
            font={font}
            mapDomainToCanvas={mapDomainToCanvas}
          />
        </Group>
        <Group
          transform={[
            { translateX: yLabelsWidth },
            { translateY: mapDomainToCanvas(yDomain[0]) },
          ]}>
          {showLines && (
            <LabelsLines
              labels={yLabels}
              height={chartContentHeight}
              mapDomainToCanvas={mapDomainToCanvas}
              width={chartContentWidth}
            />
          )}
          {bars}
        </Group>
        <Line
          p1={{ x: yLabelsWidth, y: chartContentHeight }}
          p2={{ x: chartContentWidth + yLabelsWidth, y: chartContentHeight }}
          strokeWidth={1}
        />
        <Group
          transform={[
            { translateX: yLabelsWidth },
            { translateY: chartContentHeight },
          ]}>
          {barLabels}
        </Group>
      </Group>
    </Canvas>
  );
};

export default BarChart;
