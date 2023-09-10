import React from 'react';
import { View } from 'react-native';

interface StackProps {
  gap?: number;
  padX?: number;
  padY?: number;
  children: React.ReactNode;
}

const Stack = ({ gap = 12, padX = 10, padY = 20, children }: StackProps) => {
  return (
    <View style={{ gap, paddingHorizontal: padX, paddingVertical: padY }}>
      {children}
    </View>
  );
};

export default Stack;
