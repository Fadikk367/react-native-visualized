import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTheme } from '@/hooks/useTheme';

interface ContainerProps {
  flexDirection?: ViewStyle['flexDirection'];
  children: React.ReactNode;
  onPress?(): void;
}

const Container = ({
  children,
  flexDirection = 'row',
  onPress,
}: ContainerProps) => {
  const { colors } = useTheme();

  const containerStyles: ViewStyle[] = [
    styles.container,
    {
      flexDirection,
      alignItems: flexDirection === 'row' ? 'center' : 'stretch',
      backgroundColor: colors.surface,
    },
  ];

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.4}>
        <View style={containerStyles} pointerEvents="none">
          {children}
        </View>
      </TouchableOpacity>
    );
  }

  return <View style={containerStyles}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
