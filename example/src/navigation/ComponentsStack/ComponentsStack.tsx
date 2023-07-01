import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AreaChart from '@/screens/components/AreaChart';
import BarChart from '@/screens/components/BarChart';
import Catalogue from '@/screens/components/Catalogue';
import LineChart from '@/screens/components/LineChart';
import PieChart from '@/screens/components/PieChart';
import ProgressRing from '@/screens/components/ProgressRing';
import RadarChart from '@/screens/components/RadarChart';
import Scatter from '@/screens/components/Scatter';

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
      <Stack.Screen name="AreaChart" component={AreaChart} />
      <Stack.Screen name="BarChart" component={BarChart} />
      <Stack.Screen name="Scatter" component={Scatter} />
      <Stack.Screen name="PieChart" component={PieChart} />
      <Stack.Screen name="ProgressRing" component={ProgressRing} />
      <Stack.Screen name="RadarChart" component={RadarChart} />
    </Stack.Navigator>
  );
};

export default ComponentsStack;
