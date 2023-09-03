import React, { useState } from 'react';
import { Button, useWindowDimensions } from 'react-native';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';
import Settings from '@/components/Settings';
import { fonts } from '@/theme/fonts';
import { throttle } from '@/utils/throttle';

import CustomBar from './CustomBar';
import { dataset1, dataset2 } from './data';

const BarChart = () => {
  const fontOptions = [
    { label: 'RobotoMono', value: fonts.RobotoMono },
    { label: 'Lato', value: fonts.Lato },
    { label: 'Poppins', value: fonts.Poppins },
    { label: 'OpenSans', value: fonts.OpenSans },
  ] as const;

  const { width } = useWindowDimensions();

  const [data, setData] = useState(dataset1);
  const [font, setFont] = useState<(typeof fontOptions)[number]>(
    fontOptions[0]!,
  );
  const [isAnimated, setIsAnimated] = useState(false);
  const [barColor, setBarColor] = useState('#2d74bf');
  const [isCustomComponent, setIsCustomComponent] = useState(false);
  const [yTicksStep, setYTicksStep] = useState(4);
  const [fontSize, setFontSize] = useState(18);
  const [barRatio, setBarRatio] = useState(0.8);
  const [barRadius, setBarRadius] = useState(7);

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
        yTicks={utils.linspace(-4, 20, yTicksStep)}
        showLines
        animated={isAnimated}
        font={font.value}
        fontSize={fontSize}
        // bars config
        barRatio={barRatio}
        barColor={barColor}
        barRadius={barRadius}
        yAxis={{
          showLine: false,
          showTicks: false,
          style: {
            labels: {
              fontSize,
            },
          },
        }}
        renderBar={isCustomComponent ? CustomBar : undefined}
      />
      <Button title="Change dataset" onPress={toggleData} />
      <Settings.Group>
        <Settings.Switch
          label="Animated"
          value={isAnimated}
          onChange={setIsAnimated}
        />
        <Settings.Switch
          label="Custom Bar component"
          value={isCustomComponent}
          onChange={setIsCustomComponent}
        />
        <Settings.Slider
          label="Bar border radius"
          min={0}
          max={20}
          step={1}
          defaultValue={barRadius}
          onValueChange={throttle(setBarRadius, 50)}
        />
        <Settings.Slider
          label="Bar ratio"
          min={0.1}
          max={1}
          step={0.05}
          labelPrecision={2}
          defaultValue={barRatio}
          onValueChange={throttle(setBarRatio, 50)}
        />
        <Settings.Slider
          label="Y Axis ticks step"
          min={1}
          max={10}
          step={1}
          defaultValue={yTicksStep}
          onValueChange={throttle(setYTicksStep, 50)}
        />
        <Settings.Slider
          label="Font size"
          min={10}
          max={24}
          step={2}
          defaultValue={fontSize}
          onValueChange={throttle(setFontSize, 50)}
        />
        <Settings.ColorPicker
          color={barColor}
          label="Bar color"
          onColorPicked={setBarColor}
        />
        <Settings.FontSelect
          label="Font"
          value={font}
          options={fontOptions}
          onChange={value => setFont(value)}
        />
      </Settings.Group>
    </ScreenContainer>
  );
};

export default BarChart;
