import React from 'react';
import { StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/useTheme';

import type { OptionItem } from './types';

const OptionIconButton = ({ icon, isActive, onPress }: OptionItem) => {
  const { colors } = useTheme();

  const progress = useDerivedValue(() =>
    withTiming(Number(isActive), { duration: 200 }),
  );

  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.backgroundDark, colors.primaryDark],
    ),
  }));

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Animated.View style={[backgroundStyle, styles.option]}>
        <MaterialCommunityIcons
          // @ts-ignore
          name={icon}
          size={24}
          color={isActive ? colors.onPrimary : colors.onBackground}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default OptionIconButton;

const styles = StyleSheet.create({
  option: {
    width: 36,
    height: 36,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
