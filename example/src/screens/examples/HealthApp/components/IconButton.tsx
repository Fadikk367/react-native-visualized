import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IconButtonProps {
  icon: 'chevron-left' | 'chevron-right';
  size?: number;
  color?: string;
  accessibilityLabel?: string;
  onPress(): void;
}

const IconButton = ({
  icon,
  size = 28,
  color = '#000000',
  accessibilityLabel,
  onPress,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
