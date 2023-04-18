import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BarChart from '@/screens/components/BarChart/BarChart';
import Catalogue from '@/screens/components/Catalogue';
import LineChart from '@/screens/components/LineChart/LineChart';
import Scatter from '@/screens/components/Scatter/Scatter';

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
      <Stack.Screen name="Scatter" component={Scatter} />
    </Stack.Navigator>
  );
};

export default ComponentsStack;
