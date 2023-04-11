import React from 'react';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

const { Scatter } = Chart;

const ScatterScreen = () => {
  return (
    <ScreenContainer>
      <Scatter width={394} height={300} backgroundColor="white" />
    </ScreenContainer>
  );
};

export default ScatterScreen;
