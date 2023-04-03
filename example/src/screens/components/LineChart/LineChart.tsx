import React from 'react';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { dataset1, dataset2 } from './data';

const { LineChart, Line } = Chart;

const LineChartScreen = () => {
  const xLabels = utils.linspace(0, 100, 10);
  const yLabels = utils.linspace(0, 100, 20);

  return (
    <ScreenContainer>
      <LineChart
        width={394}
        height={320}
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        xLabels={xLabels}
        yLabels={yLabels}
        padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
        font={LatoRegular}>
        <Line color="red" strokeWidth={3} data={dataset1} />
        <Line color="blue" strokeWidth={5} data={dataset2} />
      </LineChart>
    </ScreenContainer>
  );
};

export default LineChartScreen;
