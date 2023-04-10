import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { dataset1, dataset2 } from './data';

const { LineChart, Line } = Chart;

const LineChartScreen = () => {
  const [horizontalLinesShown, setHorizontalLinesShown] = useState(false);
  const [verticalLinesShown, setVerticalLinesShown] = useState(false);

  const xLabels = utils.linspace(0, 100, 10);
  const yLabels = utils.linspace(0, 100, 20);

  return (
    <ScreenContainer>
      <LineChart
        width={394}
        height={320}
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        xLabels={xLabels}
        yLabels={yLabels}
        padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
        gridlines={{
          horizontal: horizontalLinesShown,
          vertical: verticalLinesShown,
        }}
        font={LatoRegular}>
        <Line color="red" strokeWidth={3} data={dataset1} />
        <Line color="blue" strokeWidth={5} data={dataset2} />
      </LineChart>
      <View style={styles.row}>
        <Text style={styles.switchLabel}>Show horizontal lines:</Text>
        <Switch
          value={horizontalLinesShown}
          onChange={() => setHorizontalLinesShown(prev => !prev)}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.switchLabel}>Show vertical lines:</Text>
        <Switch
          value={verticalLinesShown}
          onChange={() => setVerticalLinesShown(prev => !prev)}
        />
      </View>
    </ScreenContainer>
  );
};

export default LineChartScreen;

const styles = StyleSheet.create({
  row: {
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  switchLabel: {
    fontSize: 20,
    fontWeight: '500',
  },
});
