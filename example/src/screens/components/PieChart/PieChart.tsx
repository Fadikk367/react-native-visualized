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
import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { dataset } from './data';

type LegendPosition = 'left' | 'right' | 'top' | 'bottom';

const PieChart = () => {
  const [cutoutRadius, setCutoutRadius] = useState(80);
  const [spacing, setSpacing] = useState(8);
  const [startAngle, setStartAngle] = useState(0);
  const [isCenterLabelShown, setIsCenterLabelShown] = useState(false);
  const [legendPosition, setLegendPosition] = useState<LegendPosition>('right');
  const { width } = useWindowDimensions();

  const handleCutoutRadiusChange = (v: number) => {
    setCutoutRadius(v);
  };

  const handleSpacingChange = (v: number) => {
    setSpacing(v);
  };

  const handleStartAngleChange = (v: number) => {
    setStartAngle(v);
  };

  const total = dataset.reduce((acc, { value }) => acc + value, 0);

  const centerLabel = isCenterLabelShown
    ? {
        label: { text: `$${total.toFixed(2)}`, fontSize: 18 },
        annotation: { text: 'Total:', fontSize: 14 },
        gap: 10,
      }
    : undefined;

  const legendSizeByPosition = {
    left: { width: 70, height: 160 },
    top: { width: 374, height: 30 },
    right: { width: 70, height: 160 },
    bottom: { width: 374, height: 30 },
  };

  const legendConfig = {
    ...legendSizeByPosition[legendPosition],
    gap: 10,
    position: legendPosition,
    marker: { size: 24, radius: 5 },
    fontSize: 12,
  };

  return (
    <ScreenContainer>
      <Chart.Pie
        width={width}
        height={300}
        data={dataset}
        startAngle={-90 + startAngle}
        cutoutRadius={cutoutRadius}
        spacing={spacing}
        padding={{ top: 10, left: 10, right: 10, bottom: 10 }}
        legend={legendConfig}
        centerLabel={centerLabel}
        font={LatoRegular}
      />
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Cutout radius:</Text>
          <Text style={styles.value}>{cutoutRadius}</Text>
        </View>
        <Slider
          value={cutoutRadius}
          minimumValue={0}
          maximumValue={100}
          step={2}
          onValueChange={handleCutoutRadiusChange}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Slices spacing:</Text>
          <Text style={styles.value}>{spacing}</Text>
        </View>
        <Slider
          value={spacing}
          minimumValue={0}
          maximumValue={20}
          step={1}
          onValueChange={handleSpacingChange}
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
          onValueChange={handleStartAngleChange}
        />
      </View>
      <View style={[styles.setting, styles.row]}>
        <Text style={styles.label}>Center label:</Text>
        <Switch
          value={isCenterLabelShown}
          onChange={() => setIsCenterLabelShown(prev => !prev)}
        />
      </View>
      <View style={styles.setting}>
        <View style={styles.row}>
          <Text style={styles.label}>Legend position:</Text>
          <Text style={styles.value}>{legendPosition.toUpperCase()}</Text>
        </View>
        <View style={styles.row}>
          <Button title="LEFT" onPress={() => setLegendPosition('left')} />
          <Button title="TOP" onPress={() => setLegendPosition('top')} />
          <Button title="RIGHT" onPress={() => setLegendPosition('right')} />
          <Button title="BOTTOM" onPress={() => setLegendPosition('bottom')} />
        </View>
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

export default PieChart;
