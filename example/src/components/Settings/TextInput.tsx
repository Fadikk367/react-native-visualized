import React from 'react';
import {
  TextInputProps as RNTextINputProps,
  TextInput as RNTextInput,
  StyleSheet,
} from 'react-native';

import { useTheme } from '@/hooks/useTheme';

import Container from './Container';
import Label from './Label';

interface TextInputProps extends Omit<RNTextINputProps, 'onBlur'> {
  label: string;
  onBlur?(value: string): void;
}

const TextInput = ({ label, onBlur, ...inputProps }: TextInputProps) => {
  const { colors } = useTheme();

  return (
    <Container>
      <Label>{label}</Label>
      <RNTextInput
        {...inputProps}
        onBlur={event => onBlur?.(event.nativeEvent.text)}
        style={[
          styles.input,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.onBackground,
            color: colors.onBackground,
          },
        ]}
      />
    </Container>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    width: 160,
    fontSize: 16,
    padding: 5,
    borderBottomWidth: 1,
  },
});
