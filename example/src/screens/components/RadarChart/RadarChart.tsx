import React, { useState } from 'react';
import { Button, useWindowDimensions } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { datasets } from './data';

const RadarChart = () => {
  const [dataset, setDataset] = useState(datasets[0]);
  const { width } = useWindowDimensions();

  return (
    <ScreenContainer>
      <Chart.Radar
        width={width}
        height={400}
        variables={['agility', 'strength', 'durability', 'luck', 'speech']}
        ticks={[1, 2, 3, 4, 5]}
        domain={[0, 5]}
        data={dataset!}
        labelsOrientation="radial"
        legend={{ height: 30, width: width, gap: 0, position: 'bottom' }}
        font={LatoRegular}
      />
      <Button title="Dataset A" onPress={() => setDataset(datasets[0])} />
      <Button title="Dataset B" onPress={() => setDataset(datasets[1])} />
      <Button title="Dataset C" onPress={() => setDataset(datasets[2])} />
      <Button title="Dataset D" onPress={() => setDataset(datasets[3])} />
    </ScreenContainer>
  );
};

export default RadarChart;
