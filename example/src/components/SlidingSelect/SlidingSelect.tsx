import React from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import OptionItem from './OptionItem';
import type { SlidingSelectProps } from './types';

const ITEM_HEIGHT = 36;

const SlidingSelect = <T,>({
  value: selectedOption,
  options,
  width,
  height = 36,
  onChange,
}: SlidingSelectProps<T>) => {
  const itemSize = width / options.length;
  const animationDuration = 300;

  const selectedOptionIndex = options.findIndex(
    ({ value }) => value === selectedOption.value,
  );

  const indicatorStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(selectedOptionIndex * itemSize, {
          duration: animationDuration,
        }),
      },
      {
        scaleX: withSequence(
          withTiming(1.3, { duration: animationDuration / 2 }),
          withTiming(1, { duration: animationDuration / 2 }),
        ),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.selectIndicator,
          {
            width: itemSize,
          },
          indicatorStyles,
        ]}
      />
      {options.map((option, i) => (
        <OptionItem
          key={option.label}
          label={option.label}
          itemSize={itemSize}
          height={height}
          isActive={i === selectedOptionIndex}
          onPress={() => {
            if (selectedOption.value !== option.value) onChange(option);
          }}
        />
      ))}
    </View>
  );
};

export default SlidingSelect;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  selectIndicator: {
    position: 'absolute',
    height: ITEM_HEIGHT,
    backgroundColor: '#4b7853',
    borderRadius: 12,
  },
});
