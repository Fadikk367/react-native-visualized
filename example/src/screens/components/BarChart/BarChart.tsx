import React, { useState } from 'react';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

// TODO: Find a way to correctly set an alias like @/assets
import RobotoMono from '../../../../assets/fonts/RobotoMono.ttf';
import CustomBar from './CustomBar';
import { dataset1, dataset2 } from './data';

const BarChart = () => {
  const [data, setData] = useState(dataset1);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isCustomComponent, setIsCustomComponent] = useState(false);

  const toggleData = () => {
    const newData = data === dataset1 ? dataset2 : dataset1;
    setData(newData);
  };

  const toggleAnimated = () => {
    setIsAnimated(!isAnimated);
  };

  const toggleCustomComponent = () => {
    setIsCustomComponent(!isCustomComponent);
  };

  return (
    <ScreenContainer>
      <Chart.Bar
        width={394}
        height={420}
        data={data}
        yDomain={[-4, 22]}
        yLabels={[-4, 0, 4, 8, 12, 16, 20]}
        barRatio={0.8}
        showLines
        animated={isAnimated}
        renderBar={isCustomComponent ? CustomBar : undefined}
        padding={{ top: 20, right: 20, bottom: 10 }}
        backgroundColor="#e6e6e6"
        font={RobotoMono}
      />
      <Button title="Change dataset" onPress={toggleData} />
      <View style={styles.row}>
        <Text style={styles.animatedLabel}>Animated:</Text>
        <Switch value={isAnimated} onChange={toggleAnimated} />
      </View>
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

export default BarChart;
