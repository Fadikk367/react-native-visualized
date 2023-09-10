import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useTheme } from '@/hooks/useTheme';

import type { OptionItemProps } from './types';

const OptionItem = ({
  label,
  isActive,
  itemSize,
  height,
  onPress,
}: OptionItemProps) => {
  const theme = useTheme();

  // FIXME: Examine slow text color animations on Android, even fast phones
  // const transition = useDerivedValue(() =>
  //   withTiming(Number(isActive), { duration: 300 }),
  // );

  // const textStyles = useAnimatedStyle(() => ({
  //   color: interpolateColor(transition.value, [0, 1], ['#000', '#fff']),
  // }));

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      containerStyle={[
        styles.container,
        {
          width: itemSize,
          height,
        },
      ]}>
      <Text
        style={[
          styles.label,
          // textStyles,
          { color: isActive ? theme.colors.onPrimary : theme.colors.onSurface },
        ]}>
        {label}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default OptionItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
  },
});
