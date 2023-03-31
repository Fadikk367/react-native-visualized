import React from 'react';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

const BarChart = () => {
  const data = [
    { value: 3, label: 'MON' },
    { value: 9, label: 'TUE' },
    { value: 19, label: 'WED' },
    { value: 10, label: 'THU' },
    { value: 12, label: 'FRI' },
    { value: 16, label: 'SAT' },
    { value: 7, label: 'SUN' },
  ];

  return (
    <ScreenContainer>
      <Chart.Bar
        width={394}
        height={300}
        data={data}
        yDomain={[0, 22]}
        yLabels={[0, 4, 8, 12, 16, 20]}
        barRatio={0.8}
        showLines
      />
    </ScreenContainer>
  );
};

export default BarChart;
