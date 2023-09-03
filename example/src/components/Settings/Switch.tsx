import React from 'react';

import BaseSwitch from '@/components/Switch';
import type { SwitchProps as BaseSwitchProps } from '@/components/Switch/types';

import Container from './Container';
import Label from './Label';

interface SettingsSwitch extends BaseSwitchProps {
  label: string;
}

const Switch = ({ label, value, onChange, ...switchProps }: SettingsSwitch) => {
  return (
    <Container onPress={() => onChange?.(!value)}>
      <Label>{label}</Label>
      <BaseSwitch value={value} {...switchProps} size="small" />
    </Container>
  );
};

export default Switch;
