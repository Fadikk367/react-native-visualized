import React from 'react';
import { Text } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { dataset1 } from './data';

const LineChart = () => {
  return (
    <ScreenContainer>
      <Text>LineChart</Text>
      <Chart.Line
        width={394}
        height={320}
        data={dataset1}
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        font={LatoRegular}
      />
    </ScreenContainer>
  );
};

export default LineChart;
