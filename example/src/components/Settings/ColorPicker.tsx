import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import WheelColorPicker from 'react-native-wheel-color-picker';
import type { ColorPickerProps as WheelColorPickerProps } from 'react-native-wheel-color-picker';

import { useBottomSheet } from '@/hooks/useBottomSheet';

import Container from './Container';
import Label from './Label';

export interface ColorPickerProps extends WheelColorPickerProps {
  label: string;
  onColorPicked(color: string): void;
}

const ColorPicker = ({
  color,
  label,
  onColorPicked,
  ...props
}: ColorPickerProps) => {
  const bottomSheet = useBottomSheet();

  return (
    <Container onPress={bottomSheet.open}>
      <Label>{label}</Label>
      <View style={[styles.colorThumbnail, { backgroundColor: color }]} />
      <BottomSheetModal ref={bottomSheet.ref} snapPoints={[360]}>
        <View style={styles.container}>
          <WheelColorPicker
            swatches={false}
            gapSize={0}
            thumbSize={40}
            sliderSize={24}
            shadeSliderThumb={true}
            onColorChangeComplete={onColorPicked}
            color={color}
            {...props}
          />
        </View>
      </BottomSheetModal>
    </Container>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 320,
  },
  colorThumbnail: {
    width: 24,
    height: 24,
    borderRadius: 20,
  },
});
