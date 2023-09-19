import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

interface LabelProps {
  children: string | number;
  fontFamily?: string;
}

const Label = ({ fontFamily, children }: LabelProps) => {
  const { colors } = useTheme();
  return (
    <Text style={[styles.labelText, { fontFamily, color: colors.onSurface }]}>
      {children}
    </Text>
  );
};

export default Label;

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
