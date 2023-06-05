import React, { useState } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';

import LatoRegular from '../../../../assets/fonts/Lato-Regular.ttf';
import { dataset1, dataset2 } from './data';

const { LineChart } = Chart;

const LineChartScreen = () => {
  const [horizontalLinesShown, setHorizontalLinesShown] = useState(false);
  const [verticalLinesShown, setVerticalLinesShown] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const { width } = useWindowDimensions();

  const xLabels = utils.linspace(0, 100, 10);
  const yLabels = utils.linspace(0, 100, 20);

  return (
    <ScreenContainer>
      <LineChart
        width={width}
        height={320}
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        xTicks={xLabels}
        yTicks={yLabels}
        data={[
          { id: 'seriesA', points: dataset1, color: 'red', strokeWidth: 3 },
          { id: 'seriesB', points: dataset2, color: 'blue', strokeWidth: 5 },
        ]}
        padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
        gridlines={{
          horizontal: horizontalLinesShown,
          vertical: verticalLinesShown,
          lineWidth: 1,
          opacity: 0.2,
        }}
        xAxis={{
          arrow: showArrows
            ? { variant: 'classic', length: 16, width: 10 }
            : undefined,
          showTicks: false,
          style: {
            line: {
              strokeWidth: 3,
            },
            labels: {
              fontSize: 16,
            },
          },
        }}
        yAxis={{
          showLine: false,
          showTicks: false,
          width: 40,
          formatLabel: tick => tick.toFixed(1),
          style: {
            labels: {
              fontSize: 16,
              color: 'grey',
            },
          },
        }}
        font={LatoRegular}
      />
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
      <View style={styles.row}>
        <Text style={styles.switchLabel}>Show x axis arrow:</Text>
        <Switch
          value={showArrows}
          onChange={() => setShowArrows(prev => !prev)}
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
