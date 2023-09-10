import React from 'react';

import BaseToggleGroup from '@/components/ToggleGroup';
import type { ToggleGroupProps as BaseToggleGroupProps } from '@/components/ToggleGroup/types';

import Container from './Container';
import Label from './Label';

interface ToggleGroupProps<T> extends BaseToggleGroupProps<T> {
  label: string;
}

const ToggleGroups = <T,>({
  label,
  ...toggleGroupProps
}: ToggleGroupProps<T>) => {
  return (
    <Container>
      <Label>{label}</Label>
      <BaseToggleGroup {...toggleGroupProps} />
    </Container>
  );
};

export default ToggleGroups;
