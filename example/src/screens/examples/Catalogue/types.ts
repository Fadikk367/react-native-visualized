import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { BottomTabsTypes } from '@/navigation/BottomTabs/types';
import type { ExamplesStackParams } from '@/navigation/ExamplesStack/types';

export type CatalogueProps = BottomTabScreenProps<BottomTabsTypes, 'Examples'>;

export type ExamplesStackScreens = keyof ExamplesStackParams;
