import React, { useCallback } from 'react';
import { ListRenderItem, StyleSheet, Text, View } from 'react-native';

import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useBottomSheet } from '@/hooks/useBottomSheet';

export interface SelectProps<T extends { label: string }> {
  label: string;
  value: T;
  options: T[];
  onChange(value: T): void;
}

const Select = <T extends { label: string }>({
  label,
  value,
  options,
  onChange,
}: SelectProps<T>) => {
  const { ref, open, close } = useBottomSheet();

  const handleChange = useCallback(
    (item: T) => {
      onChange(item);
      close();
    },
    [onChange, close],
  );

  const renderItem = useCallback<ListRenderItem<T>>(
    ({ item }) => (
      <TouchableOpacity onPress={() => handleChange(item)}>
        <Text style={[styles.optionLabel, { fontFamily: item.label }]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    ),
    [handleChange],
  );

  return (
    <TouchableOpacity onPress={open}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.label, { fontFamily: value.label }]}>
          {value.label}
        </Text>
      </View>
      <BottomSheetModal ref={ref} snapPoints={[240]}>
        <BottomSheetFlatList
          data={options}
          keyExtractor={item => item.label}
          renderItem={renderItem}
          ItemSeparatorComponent={<View style={styles.optionSeparator} />}
        />
      </BottomSheetModal>
    </TouchableOpacity>
  );
};

export default Select;

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
  optionLabel: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 48,
    alignItems: 'center',
  },
  optionSeparator: {
    height: 1,
    marginHorizontal: 10,
    backgroundColor: '#cecece',
  },
});
