import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Catalogue from '@/screens/examples/Catalogue';
import HealthApp from '@/screens/examples/HealthApp';
import StocksApp from '@/screens/examples/StocksApp';

import type { ExamplesStackParams } from './types';

const Stack = createNativeStackNavigator<ExamplesStackParams>();

const ExamplesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Catalogue"
        /* @ts-ignore */
        component={Catalogue}
        options={{ title: 'Examples' }}
      />
      <Stack.Screen
        name="HealthApp"
        component={HealthApp}
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen name="StocksApp" component={StocksApp} />
    </Stack.Navigator>
  );
};

export default ExamplesStack;
