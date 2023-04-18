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
  const [isLegendShown, setIsLegendShown] = useState(false);
  const [showGridlines, setShowGridlines] = useState(true);
  const [showContinuousLegend, setShowContinuousLegend] = useState(false);

  const xTicks = utils.linspace(0, 100, 20);
  const yTicks = utils.linspace(0, 100, 20);

  const toggleCustomComponent = () => {
    setIsCustomComponent(prev => !prev);
  };

  const toggleLegend = () => {
    setIsLegendShown(prev => !prev);
  };

  const toggleGridlines = () => {
    setShowGridlines(prev => !prev);
  };

  const toggleShowContinuousLegend = () => {
    setShowContinuousLegend(prev => !prev);
  };

  const legendConfig = {
    fontSize: 12,
    height: 40,
    items: [
      { color: 'yellow', label: 'series A' },
      { color: 'blue', label: 'series B' },
      { color: 'red', label: 'series C' },
      { color: 'green', label: 'series D' },
    ],
  };

  const gridlinesConfig = {
    vertical: true,
    horizontal: true,
    lineWidth: 1,
    opacity: 0.2,
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
        padding={{
          top: isLegendShown ? 5 : 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        legend={isLegendShown ? legendConfig : undefined}
        marker={{
          variant: 'dot',
          // color: 'red',
          size: 7,
        }}
        renderMarker={isCustomComponent ? CustomMarker : undefined}
        gridlines={showGridlines ? gridlinesConfig : null}
        showContinuousLegend={showContinuousLegend}
        font={LatoRegular}
      />
      <View style={styles.row}>
        <Text style={styles.animatedLabel}>Custom Bar component:</Text>
        <Switch value={isCustomComponent} onChange={toggleCustomComponent} />
      </View>
      <View style={styles.row}>
        <Text style={styles.animatedLabel}>Show legend:</Text>
        <Switch value={isLegendShown} onChange={toggleLegend} />
      </View>
      <View style={styles.row}>
        <Text style={styles.animatedLabel}>Show continuous legend:</Text>
        <Switch
          value={showContinuousLegend}
          onChange={toggleShowContinuousLegend}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.animatedLabel}>Show gridlines:</Text>
        <Switch value={showGridlines} onChange={toggleGridlines} />
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
