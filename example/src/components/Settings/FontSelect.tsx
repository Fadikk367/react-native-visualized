import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import type { fonts } from '@/theme/fonts';

import Label from './Label';
import Select from './Select';
import type { OptionItemProps, SelectProps } from './Select';

interface FontOption {
  label: keyof typeof fonts;
  value: any;
}

interface FontSelectProps extends SelectProps<FontOption> {}

const FontSelect = (props: FontSelectProps) => {
  return (
    <Select
      {...props}
      OptionItem={FontOptionItem}
      CurrentItemPreview={CurrentFontOptionItemPreview}
    />
  );
};

export default FontSelect;

const FontOptionItem = ({ item, onPress }: OptionItemProps<FontOption>) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={[styles.optionLabel, { fontFamily: item.label }]}>
      {item.label}
    </Text>
  </TouchableOpacity>
);

const CurrentFontOptionItemPreview = ({ item }: { item: FontOption }) => (
  <Label fontFamily={item.label}>{item.label}</Label>
);

const styles = StyleSheet.create({
  optionLabel: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
