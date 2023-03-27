import type { NavigatorScreenParams } from '@react-navigation/native';

import type { ComponentsStackParams } from '../ComponentsStack/types';
import type { ExamplesStackParams } from '../ExamplesStack/types';

export type BottomTabsTypes = {
  Components: NavigatorScreenParams<ComponentsStackParams>;
  Examples: NavigatorScreenParams<ExamplesStackParams>;
};
