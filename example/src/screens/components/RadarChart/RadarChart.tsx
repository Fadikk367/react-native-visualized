import React from 'react';
import { useWindowDimensions } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';

const RadarChart = () => {
  const { width } = useWindowDimensions();
  return (
    <ScreenContainer>
      <Chart.Radar
        width={width}
        height={300}
        variables={['a', 'b', 'c', 'd', 'e']}
        ticks={[1, 2, 3, 4, 5]}
        domain={[0, 5]}
        data={[
          { a: 1, b: 2, c: 3, d: 2, e: 3, color: 'red' },
          { a: 2, b: 1.5, c: 4, d: 0.1, e: 2.3, color: 'blue' },
          { a: 0.5, b: 1, c: 1, d: 3.3, e: 5, color: 'yellow' },
          { a: 3, b: 4.5, c: 5, d: 4, e: 2, color: 'orange' },
          { a: 2, b: 3.3, c: 4.1, d: 1, e: 4.4, color: 'green' },
        ]}
        font={LatoRegular}
      />
    </ScreenContainer>
  );
};

export default RadarChart;
