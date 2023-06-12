import React from 'react';
import { Text, useWindowDimensions } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';

const RadarChart = () => {
  const { width } = useWindowDimensions();
  return (
    <ScreenContainer>
      <Text>RadarChart</Text>
      <Chart.Radar
        width={width}
        height={300}
        variables={['a', 'b', 'c']}
        domain={[0, 5]}
        data={[
          { a: 1, b: 2, c: 3 },
          { a: 2, b: 1.5, c: 4 },
          { a: 0.5, b: 1, c: 1 },
        ]}
        font={LatoRegular}
      />
    </ScreenContainer>
  );
};

export default RadarChart;
