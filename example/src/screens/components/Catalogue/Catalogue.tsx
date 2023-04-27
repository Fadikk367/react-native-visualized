import React from 'react';
import { Button } from 'react-native';

import ScreenContainer from '@/components/ScreenContainer';

import type { CatalogueProps, ComponentsStackScreens } from './types';

const Catalogue = ({ navigation }: CatalogueProps) => {
  const getNavigateTo = (screen: ComponentsStackScreens) => () => {
    navigation.navigate('Components', { screen });
  };

  return (
    <ScreenContainer>
      <Button title="LineChart" onPress={getNavigateTo('LineChart')} />
      <Button title="BarChart" onPress={getNavigateTo('BarChart')} />
      <Button title="Scatter" onPress={getNavigateTo('Scatter')} />
      <Button title="PieChart" onPress={getNavigateTo('PieChart')} />
      <Button title="ProgressRing" onPress={getNavigateTo('ProgressRing')} />
    </ScreenContainer>
  );
};

export default Catalogue;
