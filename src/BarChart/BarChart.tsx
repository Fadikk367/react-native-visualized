import React from 'react';
import { StyleSheet } from 'react-native';

import { Canvas, Group, Line } from '@shopify/react-native-skia';

import Bar from './Bar';
import BarLabel from './BarLabel';
import type { BarChartProps } from './types';

const BarChart = ({
  width,
  height,
  data,
  yDomain,
  barRatio = 0.9,
}: BarChartProps) => {
  // TODO: Take into account y axis labels width
  const barSpace = width / data.length;
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
      <Group
        transform={[{ rotate: Math.PI }]}
        origin={{ x: width / 2, y: height / 2 }}>
        {bars}
      </Group>
      <Line
        p1={{ x: 0, y: chartContentHeight }}
        p2={{ x: width, y: chartContentHeight }}
        strokeWidth={1}
      />
      <Group transform={[{ translateY: chartContentHeight }]}>
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
