import React from 'react';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { dataset1, dataset2, dataset3 } from './data';

const { AreaChart } = Chart;

const AreaChartScreen = () => {
  const xLabels = utils.linspace(0, 4, 1);
  const yLabels = utils.linspace(0, 10, 2);

  return (
    <ScreenContainer>
      <AreaChart
        width={394}
        height={320}
        xDomain={[0, 4]}
        yDomain={[0, 10]}
        xTicks={xLabels}
        yTicks={yLabels}
        stacked
        data={[
          { id: 'seriesA', points: dataset1, color: '#d75454' },
          { id: 'seriesB', points: dataset2, color: '#67a0d8' },
          { id: 'seriesC', points: dataset3, color: '#e0e359' },
        ]}
        padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
        gridlines={{
          horizontal: true,
        }}
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
          // showLine: false,
          // showTicks: false,
          width: 40,
          style: {
            labels: {
              fontSize: 16,
              color: 'black',
            },
          },
        }}
        font={LatoRegular}
      />
    </ScreenContainer>
  );
};

export default AreaChartScreen;
