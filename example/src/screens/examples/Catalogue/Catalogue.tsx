import React from 'react';
import { Button } from 'react-native';

import ScreenContainer from '@/components/ScreenContainer';

import type { CatalogueProps, ExamplesStackScreens } from './types';

const Catalogue = ({ navigation }: CatalogueProps) => {
  const getNavigateTo = (screen: ExamplesStackScreens) => () => {
    navigation.navigate('Examples', { screen });
  };

  return (
    <ScreenContainer>
      <Button title="Health App" onPress={getNavigateTo('HealthApp')} />
      <Button title="Stocks App" onPress={getNavigateTo('StocksApp')} />
    </ScreenContainer>
  );
};

export default Catalogue;
