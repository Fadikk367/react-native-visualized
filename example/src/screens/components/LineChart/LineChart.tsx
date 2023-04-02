import React from 'react';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { dataset1 } from './data';

const LineChart = () => {
  return (
    <ScreenContainer>
      <Chart.Line
        width={394}
        height={320}
        data={dataset1}
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
        font={LatoRegular}
      />
    </ScreenContainer>
  );
};

export default LineChart;
