import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface LabelProps {
  children: string | number;
  fontFamily?: string;
}

const Label = ({ fontFamily, children }: LabelProps) => {
  return <Text style={[styles.labelText, { fontFamily }]}>{children}</Text>;
};

export default Label;

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
