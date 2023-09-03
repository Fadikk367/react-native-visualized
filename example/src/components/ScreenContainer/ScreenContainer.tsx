import React from 'react';
import { StyleSheet } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ScreenContainerProps } from './types';

const ScreenContainer = ({ style, children }: ScreenContainerProps) => {
  return (
    // Until all screens are displayed with bottom tabs navigation and header top and bottom insets are handled by them
    <SafeAreaView edges={['left', 'right']} style={[styles.container, style]}>
      <ScrollView style={styles.container}>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
});
