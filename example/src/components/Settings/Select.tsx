import React, { useCallback } from 'react';
import { ListRenderItem, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Flex from '@/components/Flex';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { useTheme } from '@/hooks/useTheme';

import Container from './Container';
import Label from './Label';

export interface SelectProps<T extends { label: string }> {
  label: string;
  value: T;
  options: readonly T[];
  onChange(value: T): void;
  OptionItem?: React.FC<OptionItemProps<T>>;
  CurrentItemPreview?: React.FC<{ item: T }>;
}

export interface OptionItemProps<T extends { label: string }> {
  item: T;
  onPress(): void;
}

const Select = <T extends { label: string }>({
  label,
  value,
  options,
  OptionItem = DefaultOptionItem,
  CurrentItemPreview = DefaultCurrentItemPreview,
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
    ({ item }) => <OptionItem item={item} onPress={() => handleChange(item)} />,
    [handleChange, OptionItem],
  );

  return (
    <>
      <Container onPress={open}>
        <Label>{label}</Label>
        <Flex alignItems="center" direction="row">
          <CurrentItemPreview item={value} />
          <MaterialCommunityIcons name="chevron-right" size={24} />
        </Flex>
      </Container>
      <BottomSheetModal ref={ref} snapPoints={[240]}>
        <BottomSheetFlatList
          data={options}
          keyExtractor={item => item.label}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
        />
      </BottomSheetModal>
    </>
  );
};

export default Select;

const DefaultOptionItem = ({
  item,
  onPress,
}: {
  item: { label: string };
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.optionLabel}>{item.label}</Text>
  </TouchableOpacity>
);

const DefaultCurrentItemPreview = ({ item }: { item: { label: string } }) => (
  <Label>{item.label}</Label>
);

const ItemSeparator = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.optionSeparator,
        { backgroundColor: colors.backgroundLight },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  optionLabel: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionSeparator: {
    height: 1,
    marginHorizontal: 10,
  },
});
