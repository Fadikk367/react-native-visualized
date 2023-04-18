import React from 'react';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { dataset } from './data';

const PieChart = () => {
  return (
    <ScreenContainer>
      <Chart.Pie
        width={394}
        height={300}
        data={dataset}
        startAngle={-90}
        cutoutRadius={80}
        spacing={8}
        font={LatoRegular}
      />
    </ScreenContainer>
  );
};

export default PieChart;
