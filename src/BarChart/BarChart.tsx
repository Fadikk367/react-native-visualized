import React from 'react';
import { StyleSheet } from 'react-native';

import { Canvas, Group, Line } from '@shopify/react-native-skia';

import Bar from './Bar';
import BarLabel from './BarLabel';
import YLabels from './YLabels';
import type { BarChartProps } from './types';

const BarChart = ({
  width,
  height,
  data,
  yDomain,
  yLabels,
  barRatio = 0.9,
  yLabelsWidth = 40,
}: BarChartProps) => {
  // TODO: Take into account y axis labels width
  const barSpace = (width - yLabelsWidth) / data.length;
  // TODO: when y domain is missing / set to auto determine based on data extremums
  const yDomainSize = yDomain[1] - yDomain[0];
  const labelsBarHeight = 30;
  const chartContentHeight = height - labelsBarHeight;
  const barPadding = (barSpace - barSpace * barRatio) / 2;

  const mapDomainToCanvas = (domainValue: number) => {
    return (chartContentHeight / yDomainSize) * domainValue;
  };

  const bars = data.map(({ value }, index) => (
    <Group
      key={`${index}-${value}`}
      transform={[
        { translateX: barSpace * index },
        { translateY: height - chartContentHeight },
      ]}>
      <Bar
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
      <Group
        transform={[{ translateX: yLabelsWidth }, { rotate: Math.PI }]}
        origin={{ x: (width - yLabelsWidth) / 2, y: height / 2 }}>
        {bars}
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
