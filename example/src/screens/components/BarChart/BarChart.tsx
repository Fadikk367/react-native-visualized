import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { Chart } from 'react-native-visualized';

import ColorPicker from '@/components/ColorPicker';
import ScreenContainer from '@/components/ScreenContainer';
import Select from '@/components/Select/Select';
import Switch from '@/components/Switch';
import { fonts } from '@/theme/fonts';

import CustomBar from './CustomBar';
import { dataset1, dataset2 } from './data';

const BarChart = () => {
  const fontOptions = [
    { label: 'Roboto', value: fonts.RobotoMono },
    { label: 'Lato', value: fonts.Lato },
    { label: 'Poppins', value: fonts.Poppins },
    { label: 'OpenSans', value: fonts.OpenSans },
  ];

  const [data, setData] = useState(dataset1);
  const [font, setFont] = useState(fontOptions[0]!);
  const [isAnimated, setIsAnimated] = useState(false);
  const [barColor, setBarColor] = useState('#2d74bf');
  const [isCustomComponent, setIsCustomComponent] = useState(false);
  const { width } = useWindowDimensions();

  const toggleData = () => {
    const newData = data === dataset1 ? dataset2 : dataset1;
    setData(newData);
  };

  return (
    <ScreenContainer>
      <Chart.Bar
        width={width}
        height={420}
        padding={{ top: 20, right: 20, bottom: 10 }}
        backgroundColor="#e6e6e6"
        data={data}
        yDomain={[-4, 20]}
        yTicks={[-4, 0, 4, 8, 12, 16, 20]}
        showLines
        animated={isAnimated}
        font={font.value}
        fontSize={18}
        // bars config
        barRatio={0.8}
        barColor={barColor}
        barRadius={7}
        yAxis={{
          showLine: false,
          showTicks: false,
        }}
        renderBar={isCustomComponent ? CustomBar : undefined}
      />
      <Button title="Change dataset" onPress={toggleData} />
      <View style={styles.row}>
        <Text style={styles.animatedLabel}>Animated:</Text>
        <Switch value={isAnimated} onChange={setIsAnimated} />
      </View>
      <View style={styles.row}>
        <Text style={styles.animatedLabel}>Custom Bar component:</Text>
        <Switch value={isCustomComponent} onChange={setIsCustomComponent} />
      </View>
      <Select
        label="Font"
        value={font}
        options={fontOptions}
        onChange={value => setFont(value)}
      />
      <ColorPicker
        color={barColor}
        label="Bar color"
        onColorPicked={setBarColor}
      />
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
