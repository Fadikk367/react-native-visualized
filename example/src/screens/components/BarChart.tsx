import React from 'react';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

const BarChart = () => {
  const data = [
    { value: 3, label: 'MON' },
    { value: 7, label: 'TUE' },
    { value: 12, label: 'WED' },
    { value: 8, label: 'THU' },
    { value: 10, label: 'FRI' },
    { value: 11, label: 'SAT' },
    { value: 2, label: 'SUN' },
  ];

  return (
    <ScreenContainer>
      <Chart.Bar
        width={394}
        height={300}
        data={data}
        yDomain={[0, 14]}
        barRatio={0.9}
      />
    </ScreenContainer>
  );
};

export default BarChart;
