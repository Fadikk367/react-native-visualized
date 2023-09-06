import React from 'react';
import { StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import type { OptionItemProps } from './types';

const OptionItem = ({
  label,
  isActive,
  itemSize,
  height,
  onPress,
}: OptionItemProps) => {
  const transition = useDerivedValue(() =>
    withTiming(Number(isActive), { duration: 300 }),
  );

  const textStyles = useAnimatedStyle(() => ({
    color: interpolateColor(transition.value, [0, 1], ['#000', '#fff']),
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      containerStyle={[
        styles.container,
        {
          width: itemSize,
          height,
        },
      ]}>
      <Animated.Text style={[styles.label, textStyles]}>{label}</Animated.Text>
    </TouchableOpacity>
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
