import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Switch,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import Slider from '@react-native-community/slider';
import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { datasetA, datasetB, datasetC, datasetD } from './data';

const { AreaChart } = Chart;

const AreaChartScreen = () => {
  const { width } = useWindowDimensions();

  const [normalized, setNormalized] = useState(false);
  const [stacked, setStacked] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [stroke, setStroke] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [data, setData] = useState(datasetA);

  const xLabels = utils.linspace(0, 4, 1);
  const yLabels = utils.linspace(0, 10, 2);

  return (
    <ScreenContainer>
      <AreaChart
        width={width}
        height={320}
        xDomain={[0, 4]}
        yDomain={[0, 10]}
        xTicks={xLabels}
        yTicks={yLabels}
        stacked={stacked}
        normalized={normalized}
        data={data}
        opacity={opacity}
        stroke={stroke}
        animated={animated}
        padding={{ top: 10, bottom: 0, left: 20, right: 20 }}
        gridlines={{
          horizontal: true,
        }}
        legend={{
          marker: { width: 30, height: 4, radius: 2, gap: 5 },
          position: 'top',
          height: 40,
          fontSize: 14,
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
      <View style={[styles.setting, styles.row]}>
        <Text style={styles.switchLabel}>Animated:</Text>
        <Switch value={animated} onChange={() => setAnimated(prev => !prev)} />
      </View>
      <View style={styles.spacer} />
      <View style={[styles.setting, styles.row]}>
        <Text style={styles.switchLabel}>Stacked:</Text>
        <Switch value={stacked} onChange={() => setStacked(prev => !prev)} />
      </View>
      <View style={styles.spacer} />
      <View style={[styles.setting, styles.row]}>
        <Text style={styles.switchLabel}>Normalize:</Text>
        <Switch
          value={normalized}
          onChange={() => setNormalized(prev => !prev)}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Opacity:</Text>
          <Text style={styles.value}>{opacity.toFixed(2)}</Text>
        </View>
        <Slider
          value={opacity}
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          onValueChange={v => setOpacity(v)}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Stroke:</Text>
          <Text style={styles.value}>{stroke}</Text>
        </View>
        <Slider
          value={stroke}
          minimumValue={0}
          maximumValue={10}
          step={1}
          onValueChange={v => setStroke(v)}
        />
      </View>
      <View style={styles.spacer} />
      <View style={[styles.setting, styles.row]}>
        <Button title="data A" onPress={() => setData(datasetA)} />
        <Button title="data B" onPress={() => setData(datasetB)} />
        <Button title="data C" onPress={() => setData(datasetC)} />
        <Button title="data D" onPress={() => setData(datasetD)} />
      </View>
    </ScreenContainer>
  );
};

export default AreaChartScreen;

const styles = StyleSheet.create({
  setting: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
  },
  spacer: {
    height: 2,
    backgroundColor: '#ffffff',
  },
  switchLabel: {
    fontSize: 20,
    fontWeight: '500',
  },
});
