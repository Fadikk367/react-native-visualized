import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { BottomTabsTypes } from '@/navigation/BottomTabs/types';
import type { ComponentsStackParams } from '@/navigation/ComponentsStack/types';

export type CatalogueProps = BottomTabScreenProps<
  BottomTabsTypes,
  'Components'
>;

export type ComponentsStackScreens = keyof ComponentsStackParams;
