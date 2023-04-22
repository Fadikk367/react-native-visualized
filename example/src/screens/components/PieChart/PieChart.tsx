import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Slider from '@react-native-community/slider';
import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { dataset } from './data';

const PieChart = () => {
  const [cutoutRadius, setCutoutRadius] = useState(80);
  const [spacing, setSpacing] = useState(8);
  const [startAngle, setStartAngle] = useState(0);

  const handleCutoutRadiusChange = (v: number) => {
    setCutoutRadius(v);
  };

  const handleSpacingChange = (v: number) => {
    setSpacing(v);
  };

  const handleStartAngleChange = (v: number) => {
    setStartAngle(v);
  };

  return (
    <ScreenContainer>
      <Chart.Pie
        width={394}
        height={300}
        data={dataset}
        startAngle={-90 + startAngle}
        cutoutRadius={cutoutRadius}
        spacing={spacing}
        padding={{ top: 10, left: 10, right: 10, bottom: 10 }}
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
