import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { clamp } from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/useTheme';

import { THUMB_SIZES } from './constants';
import type { SliderProps } from './types';

const Slider = ({
  size = 'medium',
  activeTrackColor,
  inactiveTrackColor,
  thumbColor,
  defaultValue = 0,
  step = 1,
  min = 0,
  max = 10,
  onSlidingComplete,
  onSlidingBegin,
  onValueChange,
}: SliderProps) => {
  const thumbSize = THUMB_SIZES[size];
  // FIXME: ensure that width is known at this point
  const [trackWidth, setTrackWidth] = useState(300);
  const { colors } = useTheme();

  const progress = useSharedValue(
    interpolate(defaultValue, [min, max], [0, trackWidth]),
  );

  const thumbScale = useSharedValue(1);

  useAnimatedReaction(
    () =>
      Math.round(
        interpolate(progress.value, [0, trackWidth], [min, max]) / step,
      ),
    (current, previous) => {
      if (current !== previous && onValueChange) {
        runOnJS(onValueChange)(step * current);
      }
    },
  );

  const tap = useMemo(
    () =>
      Gesture.Tap().onEnd(e => {
        progress.value = clamp(e.x, 0, trackWidth);
      }),
    [progress, trackWidth],
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .onStart(({}) => {
          thumbScale.value = withTiming(1.2, { duration: 200 });
          if (!onSlidingBegin) return;

          runOnJS(onSlidingBegin)(
            Math.round(
              interpolate(progress.value, [0, trackWidth], [min, max]) / step,
            ),
          );
        })
        .onChange(e => {
          progress.value = clamp(progress.value + e.changeX, 0, trackWidth);
        })
        .onEnd(() => {
          thumbScale.value = withTiming(1, undefined, () => {
            if (!onSlidingComplete) return;

            const nextStep = Math.round(
              interpolate(progress.value, [0, trackWidth], [min, max]) / step,
            );

            runOnJS(onSlidingComplete)(nextStep * step);
          });
        }),
    [
      max,
      min,
      onSlidingBegin,
      onSlidingComplete,
      progress,
      step,
      thumbScale,
      trackWidth,
    ],
  );

  const thumbStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: clamp(progress.value, 0, trackWidth - thumbSize),
      },
      { scale: thumbScale.value },
    ],
  }));

  const filledTrackStyles = useAnimatedStyle(() => ({
    width: clamp(progress.value, 0, trackWidth - thumbSize / 2) + thumbSize / 2,
  }));

  return (
    <GestureDetector gesture={tap}>
      <View
        onLayout={({ nativeEvent }) => setTrackWidth(nativeEvent.layout.width)}
        style={[
          {
            height: thumbSize / 2,
            borderRadius: thumbSize / 2,
            backgroundColor: inactiveTrackColor || colors.background,
          },
        ]}>
        <Animated.View
          style={[
            {
              backgroundColor: activeTrackColor || colors.secondary,
              height: thumbSize / 2,
              borderRadius: thumbSize / 2,
            },
            filledTrackStyles,
          ]}
        />
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.thumb,
              {
                top: -thumbSize / 4,
                borderRadius: thumbSize / 2,
                width: thumbSize,
                height: thumbSize,
                backgroundColor: thumbColor || colors.surface,
                borderColor: colors.primary,
              },
              thumbStyles,
            ]}
          />
        </GestureDetector>
      </View>
    </GestureDetector>
  );
};

export default Slider;

const styles = StyleSheet.create({
  thumb: {
    position: 'absolute',
    borderWidth: 4,
  },
});
