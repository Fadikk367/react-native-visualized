import React from 'react';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { dataset1, dataset2 } from './data';

const { AreaChart } = Chart;

const AreaChartScreen = () => {
  const xLabels = utils.linspace(0, 100, 10);
  const yLabels = utils.linspace(0, 100, 20);

  return (
    <ScreenContainer>
      <AreaChart
        width={394}
        height={320}
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        xTicks={xLabels}
        yTicks={yLabels}
        data={[
          { id: 'seriesA', points: dataset1, color: '#d75454', opacity: 0.7 },
          { id: 'seriesB', points: dataset2, color: '#67a0d8', opacity: 0.7 },
        ]}
        padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
        xAxis={{
          style: {
            line: {
              strokeWidth: 2,
            },
            labels: {
              fontSize: 16,
            },
          },
        }}
        yAxis={{
          showLine: false,
          showTicks: false,
          width: 40,
          formatLabel: tick => tick.toFixed(1),
          style: {
            labels: {
              fontSize: 16,
              color: 'grey',
            },
          },
        }}
        font={LatoRegular}
      />
    </ScreenContainer>
  );
};

export default AreaChartScreen;
