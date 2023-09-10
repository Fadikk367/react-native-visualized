import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from './contexts/theme';
import { BottomTabs } from './navigation';
import { fonts } from './theme/fonts';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(fonts);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (fontsLoaded && isReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isReady]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <BottomSheetModalProvider>
          <View style={styles.container} onLayout={() => setIsReady(true)}>
            <BottomTabs />
          </View>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
