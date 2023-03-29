import React from 'react';
import { Text } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

const LineChart = () => {
  const data = [
    { x: 0, y: 0 },
    { x: 20, y: 10 },
    { x: 40, y: 40 },
    { x: 60, y: 180 },
    { x: 80, y: 120 },
    { x: 100, y: 110 },
  ];
  return (
    <ScreenContainer>
      <Text>LineChart</Text>
      <Chart.Line width={300} height={200} data={data} />
    </ScreenContainer>
  );
};

export default LineChart;
