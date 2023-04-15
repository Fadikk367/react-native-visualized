import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import CustomMarker from './CustomMarker';
import { datasetA } from './data';

const { Scatter } = Chart;

const ScatterScreen = () => {
  const [isCustomComponent, setIsCustomComponent] = useState(false);

  const xTicks = utils.linspace(0, 100, 20);
  const yTicks = utils.linspace(0, 100, 20);

  const toggleCustomComponent = () => {
    setIsCustomComponent(prev => !prev);
  };

  return (
    <ScreenContainer>
      <Scatter
        width={394}
        height={300}
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        valueDomain={[0, 50]}
        valueDomainColors={['lightskyblue', 'blue']}
        xTicks={xTicks}
        yTicks={yTicks}
        backgroundColor="white"
        data={datasetA}
        padding={{ top: 20, right: 20, bottom: 20, left: 20 }}
        marker={{
          variant: 'dot',
          color: 'red',
          size: 7,
        }}
        renderMarker={isCustomComponent ? CustomMarker : undefined}
        // gridlines={{
        //   vertical: true,
        //   color: 'blue',
        //   lineWidth: 1,
        //   opacity: 0.2,
        // }}
        font={LatoRegular}
      />
      <View style={styles.row}>
        <Text style={styles.animatedLabel}>Custom Bar component:</Text>
        <Switch value={isCustomComponent} onChange={toggleCustomComponent} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  animatedLabel: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default ScatterScreen;
