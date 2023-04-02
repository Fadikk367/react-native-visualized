import React from 'react';
import { Text } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import { dataset1 } from './data';

const LineChart = () => {
  return (
    <ScreenContainer>
      <Text>LineChart</Text>
      <Chart.Line width={394} height={320} data={dataset1} />
    </ScreenContainer>
  );
};

export default LineChart;
