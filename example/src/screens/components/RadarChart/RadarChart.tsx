import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import Slider from '@react-native-community/slider';
import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { datasets } from './data';

const RadarChart = () => {
  const [dataset, setDataset] = useState(datasets[0]);
  const [labelsOrientation, setLabelsOrientation] = useState<
    'radial' | 'horizontal'
  >('radial');
  const [labelsPadding, setLabelsPadding] = useState(40);
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
        labelsOrientation={labelsOrientation}
        labelsPadding={labelsPadding}
        legend={{
          height: 60,
          width: width,
          gap: 0,
          position: 'bottom',
          padding: { left: 20 },
          marker: { size: 20, radius: 4 },
          layout: { rows: 2, columns: 3 },
        }}
        font={LatoRegular}
        fontSize={12}
      />
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Labels padding:</Text>
          <Text style={styles.value}>{labelsPadding}</Text>
        </View>
        <Slider
          value={labelsPadding}
          minimumValue={0}
          maximumValue={80}
          step={5}
          onValueChange={v => setLabelsPadding(v)}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Labels orientation:</Text>
          <Text style={styles.value}>{labelsOrientation}</Text>
        </View>
        <View style={styles.row}>
          <Button
            title="Horizontal"
            onPress={() => setLabelsOrientation('horizontal')}
          />
          <Button
            title="Radial"
            onPress={() => setLabelsOrientation('radial')}
          />
        </View>
      </View>
      <View style={styles.spacer} />
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Dataset:</Text>
          <Text style={styles.value}>{datasets.indexOf(dataset!)}</Text>
        </View>
        <View style={styles.row}>
          <Button title="  0  " onPress={() => setDataset(datasets[0])} />
          <Button title="  1  " onPress={() => setDataset(datasets[1])} />
          <Button title="  2  " onPress={() => setDataset(datasets[2])} />
          <Button title="  3  " onPress={() => setDataset(datasets[3])} />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default RadarChart;

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
});
