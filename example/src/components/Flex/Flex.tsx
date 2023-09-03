import React from 'react';
import { View } from 'react-native';

import type { FlexProps } from './types';

const Flex = ({ direction, children, ...flexStyles }: FlexProps) => (
  <View style={[{ flexDirection: direction }, flexStyles]}>{children}</View>
);

export default Flex;
