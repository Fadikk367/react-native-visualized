import React from 'react';
import { useWindowDimensions } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';

const ProgressRing = () => {
  const { width } = useWindowDimensions();
  const rings = [
    { color: 'red', value: 78, full: 100 },
    { color: 'blue', value: 54, full: 100 },
    { color: 'green ', value: 34, full: 100, start: 6 },
    { color: 'orange ', value: 34, full: 100, start: 13 },
  ];

  return (
    <ScreenContainer>
      <Chart.ProgressRing
        width={width}
        height={300}
        data={rings}
        padding={{ top: 10, left: 10, right: 10, bottom: 10 }}
        font={LatoRegular}
      />
    </ScreenContainer>
  );
};

export default ProgressRing;
