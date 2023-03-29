import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import ComponentsStack from '../ComponentsStack';
import ExamplesStack from '../ExamplesStack';

const Tabs = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Components">
        <Tabs.Screen name="Components" component={ComponentsStack} />
        <Tabs.Screen name="Examples" component={ExamplesStack} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
