import React from 'react';
import { useWindowDimensions } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';

const ProgressRing = () => {
  const { width } = useWindowDimensions();
  const rings = [
    { label: 'Calories', color: '#d13b3b', value: 78, full: 100 },
    { label: 'Steps', color: '#31cd23', value: 54, full: 100 },
    { label: 'Time', color: '#5165f8', value: 34, full: 100 },
  ];

  return (
    <ScreenContainer>
      <Chart.ProgressRing
        width={width}
        height={320}
        data={rings}
        padding={{ top: 10, left: 10, right: 10, bottom: 10 }}
        legend={{
          height: 30,
          width,
          position: 'bottom',
          gap: 20,
        }}
        centerLabel={{
          text: '63%',
          fontSize: 32,
          color: '#5165f8',
        }}
        font={LatoRegular}
      />
    </ScreenContainer>
  );
};

export default ProgressRing;
