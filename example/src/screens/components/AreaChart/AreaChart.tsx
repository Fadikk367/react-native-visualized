import React, { useState } from 'react';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import {
  datasetA,
  datasetB,
  datasetC,
  datasetOpacityA,
  datasetOpacityB,
  datasetOpacityC,
} from './data';

const datasets = [datasetA, datasetB, datasetC];
const datasetsWithOpacity = [datasetOpacityA, datasetOpacityB, datasetOpacityC];

const { AreaChart } = Chart;

const AreaChartScreen = () => {
  const [normalized, setNormalized] = useState(false);
  const [stacked, setStacked] = useState(true);
  const [opacity, setOpacity] = useState(true);
  const [animated, setAnimated] = useState(true);
  const [data, setData] = useState(0);

  const dataset = opacity ? datasetsWithOpacity[data]! : datasets[data]!;

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
        data={dataset}
        animated={animated}
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
        <Text style={styles.switchLabel}>Animated:</Text>
        <Switch value={animated} onChange={() => setAnimated(prev => !prev)} />
      </View>
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
      <View style={styles.row}>
        <Text style={styles.switchLabel}>Opacity & Stroke:</Text>
        <Switch value={opacity} onChange={() => setOpacity(prev => !prev)} />
      </View>
      <View style={styles.row}>
        <Button title="data A" onPress={() => setData(0)} />
        <Button title="data B" onPress={() => setData(1)} />
        <Button title="data C" onPress={() => setData(2)} />
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
