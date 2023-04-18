import React from 'react';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';

const PieChart = () => {
  return (
    <ScreenContainer>
      <Chart.Pie width={394} height={300} font={LatoRegular} />
    </ScreenContainer>
  );
};

export default PieChart;
