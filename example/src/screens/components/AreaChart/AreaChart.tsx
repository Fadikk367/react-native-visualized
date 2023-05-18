import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { dataset1, dataset2, dataset3 } from './data';

const { AreaChart } = Chart;

const AreaChartScreen = () => {
  const [normalized, setNormalized] = useState(false);
  const [stacked, setStacked] = useState(false);

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
        stacked={stacked}
        normalized={normalized}
        data={[
          { id: 'seriesA', points: dataset1, color: '#d75454' },
          { id: 'seriesB', points: dataset2, color: '#67a0d8' },
          { id: 'seriesC', points: dataset3, color: '#e0e359' },
        ]}
        padding={{ top: 20, bottom: 0, left: 20, right: 20 }}
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
          width: 20,
          style: {
            labels: {
              fontSize: 16,
              color: 'black',
            },
          },
        }}
        font={LatoRegular}
      />
      <View style={styles.row}>
        <Text style={styles.switchLabel}>Stacked:</Text>
        <Switch value={stacked} onChange={() => setStacked(prev => !prev)} />
      </View>
      <View style={styles.row}>
        <Text style={styles.switchLabel}>Normalize:</Text>
        <Switch
          value={normalized}
          onChange={() => setNormalized(prev => !prev)}
        />
      </View>
    </ScreenContainer>
  );
};

export default AreaChartScreen;

const styles = StyleSheet.create({
  row: {
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  switchLabel: {
    fontSize: 20,
    fontWeight: '500',
  },
});
