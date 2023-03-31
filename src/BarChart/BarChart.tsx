import React from 'react';
import { StyleSheet } from 'react-native';

import { Canvas, Group, Line } from '@shopify/react-native-skia';

import AnimatedBar from './AnimatedBar';
import Bar from './Bar';
import BarLabel from './BarLabel';
import LabelsLines from './LabelsLines';
import YLabels from './YLabels';
import type { BarChartProps } from './types';

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
}: BarChartProps) => {
  const chartContentWidth = width - yLabelsWidth;
  const barSpace = chartContentWidth / data.length;
  // TODO: when y domain is missing / set to auto determine based on data extremums
  const yDomainSize = yDomain[1] - yDomain[0];
  const labelsBarHeight = 30;
  const chartContentHeight = height - labelsBarHeight;
  const barPadding = (barSpace - barSpace * barRatio) / 2;

  const mapDomainToCanvas = (domainValue: number) => {
    return (chartContentHeight / yDomainSize) * domainValue;
  };

  const BarComponent = animated ? AnimatedBar : Bar;

  const bars = data.map(({ value }, index) => (
    <Group
      key={index}
      transform={[
        { translateX: barSpace * index },
        { translateY: height - chartContentHeight },
      ]}>
      <BarComponent
        value={value}
        space={barSpace}
        ratio={barRatio}
        padding={barPadding}
        mapDomainToCanvas={mapDomainToCanvas}
      />
    </Group>
  ));

  const barLabels = data.map(({ label }, index) => {
    return (
      <Group key={label} transform={[{ translateX: barSpace * index }]}>
        <BarLabel label={label} space={barSpace} height={29} />
      </Group>
    );
  });

  return (
    <Canvas style={[{ width, height }, styles.canvas]}>
      <YLabels
        labels={yLabels}
        width={yLabelsWidth}
        height={chartContentHeight}
        mapDomainToCanvas={mapDomainToCanvas}
      />
      <Group transform={[{ translateX: yLabelsWidth }]}>
        {showLines && (
          <LabelsLines
            labels={yLabels}
            height={chartContentHeight}
            mapDomainToCanvas={mapDomainToCanvas}
            width={chartContentWidth}
          />
        )}
        <Group
          transform={[{ rotate: Math.PI }]}
          origin={{ x: chartContentWidth / 2, y: height / 2 }}>
          {bars}
        </Group>
      </Group>
      <Line
        p1={{ x: yLabelsWidth, y: chartContentHeight }}
        p2={{ x: width, y: chartContentHeight }}
        strokeWidth={1}
      />
      <Group
        transform={[
          { translateX: yLabelsWidth },
          { translateY: chartContentHeight },
        ]}>
        {barLabels}
      </Group>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    backgroundColor: 'lightgray',
  },
});

export default BarChart;