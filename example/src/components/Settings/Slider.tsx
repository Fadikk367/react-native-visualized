import React from 'react';
import { StyleSheet, View } from 'react-native';

import BaseSlider from '@/components/Slider';
import type { SliderProps as BaseSliderProps } from '@/components/Slider/types';

import Container from './Container';
import Label from './Label';

interface SliderProps extends BaseSliderProps {
  label: string;
  labelPrecision?: number;
}

const Slider = ({
  label,
  defaultValue,
  labelPrecision = 1,
  ...baseSliderProps
}: SliderProps) => {
  const currentValueText = Number.isInteger(defaultValue)
    ? defaultValue
    : defaultValue?.toFixed(labelPrecision);

  return (
    <Container flexDirection="column">
      <View style={styles.row}>
        <Label>{label}</Label>
        <Label>{currentValueText || 0}</Label>
      </View>
      <BaseSlider
        defaultValue={defaultValue}
        {...baseSliderProps}
        size="small"
      />
    </Container>
  );
};

export default Slider;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
});
