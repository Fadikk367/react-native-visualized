import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { useTheme } from '@/hooks/useTheme';

import ComponentsStack from '../ComponentsStack';
import ExamplesStack from '../ExamplesStack';

interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const Tabs = createBottomTabNavigator();

const BottomTabs = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.backgroundDark,
          tabBarStyle: {
            backgroundColor: colors.surface,
          },
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
        }}
        initialRouteName="Components">
        <Tabs.Screen
          name="Components"
          component={ComponentsStack}
          options={{ title: 'Charts', tabBarIcon: ChartsIcon }}
        />
        <Tabs.Screen
          name="Examples"
          component={ExamplesStack}
          options={{ tabBarIcon: ExamplesIcon }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;

const ChartsIcon = ({ color, size }: TabIconProps) => (
  <MaterialCommunityIcons name="chart-areaspline" size={size} color={color} />
);

const ExamplesIcon = ({ color, size }: TabIconProps) => (
  <MaterialCommunityIcons
    name="format-list-bulleted-type"
    size={size}
    color={color}
  />
);
