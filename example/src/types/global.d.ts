import type { BottomTabsTypes } from '@/navigation/BottomTabs/types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends BottomTabsTypes {}
  }
}
