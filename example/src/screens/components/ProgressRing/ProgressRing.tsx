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

import ScreenContainer from '@/components/ScreenContainer/ScreenContainer';
import Switch from '@/components/Switch';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { ringsA, ringsB, ringsC } from './data';

const ProgressRing = () => {
  const [showCenterLabel, setShowCenterLabel] = useState(true);
  const [data, setData] = useState(ringsA);
  const [spacing, setSpacing] = useState(4);
  const [ringWidth, setRingWidth] = useState(20);
  const [startAngle, setStartAngle] = useState(0);
  const [showLegend, setShowLegend] = useState(true);

  const { width } = useWindowDimensions();

  const legend = showLegend
    ? ({
        height: 30,
        width,
        position: 'bottom',
        gap: 20,
      } as const)
    : undefined;

  const centerLabel = showCenterLabel
    ? {
        text: '63%',
        fontSize: 32,
        color: '#5165f8',
      }
    : undefined;

  return (
    <ScreenContainer>
      <Chart.ProgressRing
        width={width}
        height={320}
        data={data}
        padding={{ top: 10, left: 10, right: 10, bottom: 10 }}
        ringWidth={ringWidth}
        ringsSpacing={spacing}
        startAngle={startAngle}
        legend={legend}
        centerLabel={centerLabel}
        font={LatoRegular}
      />
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Dataset:</Text>
        </View>
        <View style={styles.row}>
          <Button title="A" onPress={() => setData(ringsA)} />
          <Button title="B" onPress={() => setData(ringsB)} />
          <Button title="C" onPress={() => setData(ringsC)} />
        </View>
      </View>
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Ring width:</Text>
          <Text style={styles.value}>{ringWidth}</Text>
        </View>
        <Slider
          value={ringWidth}
          minimumValue={0}
          maximumValue={40}
          step={1}
          onValueChange={v => setRingWidth(v)}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Rings spacing:</Text>
          <Text style={styles.value}>{spacing}</Text>
        </View>
        <Slider
          value={spacing}
          minimumValue={0}
          maximumValue={20}
          step={1}
          onValueChange={v => setSpacing(v)}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Start angle:</Text>
          <Text style={styles.value}>{startAngle}</Text>
        </View>
        <Slider
          value={startAngle}
          minimumValue={0}
          maximumValue={360}
          step={5}
          onValueChange={v => setStartAngle(v)}
        />
      </View>
      <View style={[styles.setting, styles.row]}>
        <Text style={styles.label}>Center label:</Text>
        <Switch
          value={showCenterLabel}
          onChange={() => setShowCenterLabel(prev => !prev)}
        />
      </View>
      <View style={[styles.setting, styles.row]}>
        <Text style={styles.label}>Show legend:</Text>
        <Switch
          value={showLegend}
          onChange={() => setShowLegend(prev => !prev)}
        />
      </View>
    </ScreenContainer>
  );
};

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
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '800',
  },
  spacer: {
    height: 2,
    backgroundColor: '#ffffff',
  },
});

export default ProgressRing;
