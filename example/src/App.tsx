import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { BottomTabs } from './navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <BottomTabs />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
