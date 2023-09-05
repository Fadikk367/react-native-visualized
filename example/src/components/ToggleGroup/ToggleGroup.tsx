import React from 'react';
import { StyleSheet, View } from 'react-native';

import OptionIconButton from './OptionItem';
import type { ToggleGroupProps } from './types';

const ToggleGroup = <T,>({
  value: selectedValue,
  options,
  onChange,
}: ToggleGroupProps<T>) => {
  return (
    <View style={styles.groupContainer}>
      {options.map(({ value, icon }) => (
        <OptionIconButton
          key={icon}
          icon={icon!}
          isActive={value === selectedValue}
          onPress={() => onChange?.(value)}
        />
      ))}
    </View>
  );
};

export default ToggleGroup;

const styles = StyleSheet.create({
  groupContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-end',
    width: 200,
  },
});
