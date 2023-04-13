import React from 'react';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { datasetA } from './data';

const { Scatter } = Chart;

const ScatterScreen = () => {
  const xTicks = utils.linspace(0, 100, 20);
  const yTicks = utils.linspace(0, 100, 20);

  return (
    <ScreenContainer>
      <Scatter
        width={394}
        height={300}
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        xTicks={xTicks}
        yTicks={yTicks}
        backgroundColor="white"
        data={datasetA}
        padding={{ top: 20, right: 20, bottom: 20, left: 20 }}
        marker={{
          variant: 'dot',
          color: 'red',
          size: 7,
        }}
        // gridlines={{
        //   vertical: true,
        //   color: 'blue',
        //   lineWidth: 1,
        //   opacity: 0.2,
        // }}
        font={LatoRegular}
      />
    </ScreenContainer>
  );
};

export default ScatterScreen;
