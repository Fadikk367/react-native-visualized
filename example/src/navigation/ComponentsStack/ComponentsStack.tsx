import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BarChart from '@/screens/components/BarChart/BarChart';
import Catalogue from '@/screens/components/Catalogue';
import LineChart from '@/screens/components/LineChart';

import type { ComponentsStackParams } from './types';

const Stack = createNativeStackNavigator<ComponentsStackParams>();

const ComponentsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Catalogue">
      <Stack.Screen
        name="Catalogue"
        /* For some reason <navigation> prop is typed as any and Catalogue uses it as typed navigation prop */
        /* @ts-ignore */
        component={Catalogue}
        options={{ title: 'Components' }}
      />
      <Stack.Screen name="LineChart" component={LineChart} />
      <Stack.Screen name="BarChart" component={BarChart} />
    </Stack.Navigator>
  );
};

export default ComponentsStack;
