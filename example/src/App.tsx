import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomTabs } from './navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
