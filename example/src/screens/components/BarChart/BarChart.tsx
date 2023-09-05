import React, { useState } from 'react';
import { Button, useWindowDimensions } from 'react-native';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';
import Settings from '@/components/Settings';
import { getFontOptions } from '@/theme/fonts';
import { throttle } from '@/utils/throttle';

import CustomBar from './CustomBar';
import { dataset1, dataset2 } from './data';

const BarChart = () => {
  const fontOptions = getFontOptions();

  const { width } = useWindowDimensions();

  const [data, setData] = useState(dataset1);
  const [font, setFont] = useState<(typeof fontOptions)[number]>(
    fontOptions[3]!,
  );
  const [isAnimated, setIsAnimated] = useState(false);
  const [barColor, setBarColor] = useState('#4ac577');
  const [isCustomComponent, setIsCustomComponent] = useState(false);
  const [yTicksStep, setYTicksStep] = useState(2);
  const [fontSize, setFontSize] = useState(14);
  const [barRatio, setBarRatio] = useState(0.75);
  const [barRadius, setBarRadius] = useState(8);
  const [showTicks, setShowTicks] = useState(false);
  const [showYAxisLine, setShowYAxisLine] = useState(false);

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
        backgroundColor="#fff"
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
          showLine: showYAxisLine,
          showTicks: showTicks,
          style: {
            labels: {
              fontSize,
            },
          },
        }}
        renderBar={isCustomComponent ? CustomBar : undefined}
      />
      <Button title="Change dataset" onPress={toggleData} />
      <Settings.Stack>
        <Settings.Group title="General">
          <Settings.Switch
            label="Animated"
            value={isAnimated}
            onChange={setIsAnimated}
          />
          <Settings.Slider
            label="Font size"
            min={10}
            max={24}
            step={2}
            defaultValue={fontSize}
            onValueChange={throttle(setFontSize, 50)}
          />
          <Settings.FontSelect
            label="Font"
            value={font}
            options={fontOptions}
            onChange={value => setFont(value)}
          />
        </Settings.Group>
        <Settings.Group title="Bar">
          <Settings.Slider
            label="Ratio"
            min={0.1}
            max={1}
            step={0.05}
            labelPrecision={2}
            defaultValue={barRatio}
            onValueChange={throttle(setBarRatio, 50)}
          />
          <Settings.Slider
            label="Border radius"
            min={0}
            max={20}
            step={1}
            defaultValue={barRadius}
            onValueChange={throttle(setBarRadius, 50)}
          />
          <Settings.ColorPicker
            color={barColor}
            label="Color"
            onColorPicked={setBarColor}
          />
          <Settings.Switch
            label="Custom component"
            value={isCustomComponent}
            onChange={setIsCustomComponent}
          />
        </Settings.Group>
        <Settings.Group title="Y Axis">
          <Settings.Switch
            label="Show ticks"
            value={showTicks}
            onChange={setShowTicks}
          />
          <Settings.Switch
            label="Show Line"
            value={showYAxisLine}
            onChange={setShowYAxisLine}
          />
          <Settings.Slider
            label="Ticks step"
            min={1}
            max={10}
            step={1}
            defaultValue={yTicksStep}
            onValueChange={throttle(setYTicksStep, 50)}
          />
        </Settings.Group>
      </Settings.Stack>
    </ScreenContainer>
  );
};

export default BarChart;
