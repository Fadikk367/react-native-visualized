import React from 'react';
import { StyleSheet } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/useTheme';

import type { ScreenContainerProps } from './types';

const ScreenContainer = ({ style, children }: ScreenContainerProps) => {
  const { colors } = useTheme();

  return (
    // Until all screens are displayed with bottom tabs navigation and header top and bottom insets are handled by them
    <SafeAreaView edges={['left', 'right']} style={[styles.flex, style]}>
      <ScrollView style={[styles.flex, { backgroundColor: colors.background }]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
