import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import WheelColorPicker from 'react-native-wheel-color-picker';

import { useBottomSheet } from '@/hooks/useBottomSheet';

import type { ColorPickerProps } from './types';

const ColorPicker = ({
  color,
  label,
  onColorPicked,
  ...props
}: ColorPickerProps) => {
  const bottomSheet = useBottomSheet();

  return (
    <TouchableOpacity onPress={bottomSheet.open}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.colorThumbnail, { backgroundColor: color }]} />
      </View>
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
    </TouchableOpacity>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 320,
  },
  row: {
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
  },
  colorThumbnail: {
    width: 36,
    height: 36,
    borderRadius: 20,
  },
});
