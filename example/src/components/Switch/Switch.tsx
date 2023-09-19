import React from 'react';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/useTheme';

import {
  HIT_SLOPE,
  THUMB_SIZES,
  TRACK_PADDING,
  TRACK_TO_THUMB_RATIO,
} from './constants';
import type { SwitchProps } from './types';

const Switch = ({
  value = false,
  size = 'medium',
  thumbColor,
  inactiveColor,
  activeColor,
  onChange,
}: SwitchProps) => {
  const { colors } = useTheme();

  const thumbSize = THUMB_SIZES[size];

  const progress = useDerivedValue(() =>
    withTiming(Number(value), { duration: 200 }),
  );

  const indicatorStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          TRACK_PADDING +
          progress.value * (thumbSize * (TRACK_TO_THUMB_RATIO - 1)),
      },
    ],
  }));

  const backgroundStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [inactiveColor || colors.background, activeColor || colors.primary],
    ),
  }));

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onChange?.(!value)}
      hitSlop={HIT_SLOPE}>
      <Animated.View
        style={[
          {
            width: thumbSize * TRACK_TO_THUMB_RATIO + 2 * TRACK_PADDING,
            height: thumbSize + 2 * TRACK_PADDING,
            borderRadius: thumbSize / 2 + TRACK_PADDING,
          },
          backgroundStyles,
        ]}>
        <Animated.View
          style={[
            {
              borderRadius: thumbSize / 2,
              width: thumbSize,
              height: thumbSize,
              marginTop: TRACK_PADDING,
              backgroundColor: thumbColor || colors.surface,
            },
            indicatorStyles,
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Switch;
