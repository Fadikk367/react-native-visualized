import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';
import Settings from '@/components/Settings';
import SlidingSelect from '@/components/SlidingSelect/SlidingSelect';
import { fonts } from '@/theme/fonts';
import { throttle } from '@/utils/throttle';

import { datasetA, datasetB, datasetC } from './data';

const { AreaChart } = Chart;

const AreaChartScreen = () => {
  const { width } = useWindowDimensions();

  const [normalized, setNormalized] = useState(false);
  const [stacked, setStacked] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [stroke, setStroke] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [axesStrokeWidth, setAxesStrokeWidth] = useState(1);
  const [axesColor, setAxesColor] = useState('#000000');
  const [showAxesTicks, setShowAxesTicks] = useState(true);
  const [data, setData] = useState({ label: 'Data A', value: datasetA });
  const [legendFontSize, setLegendFontSize] = useState(14);

  const xLabels = utils.linspace(0, 4, 1);
  const yLabels = utils.linspace(0, 10, 2);

  console.log('x', data.label);

  return (
    <ScreenContainer>
      <AreaChart
        width={width}
        height={320}
        xDomain={[0, 4]}
        yDomain={[0, 10]}
        xTicks={xLabels}
        yTicks={yLabels}
        stacked={stacked}
        normalized={normalized}
        data={data.value}
        opacity={opacity}
        stroke={stroke}
        animated={animated}
        padding={{ top: 10, bottom: 0, left: 20, right: 20 }}
        gridlines={{
          horizontal: true,
        }}
        legend={
          showLegend
            ? {
                marker: { width: 30, height: 4, radius: 2, gap: 5 },
                position: 'top',
                height: 40,
                fontSize: legendFontSize,
              }
            : undefined
        }
        xAxis={{
          showTicks: showAxesTicks,
          style: {
            line: {
              strokeWidth: axesStrokeWidth,
              color: axesColor,
            },
            labels: {
              fontSize: 16,
              color: axesColor,
            },
            ticks: {
              color: axesColor,
              width: axesStrokeWidth,
            },
          },
        }}
        yAxis={{
          width: 20,
          showTicks: showAxesTicks,
          style: {
            labels: {
              fontSize: 16,
              color: axesColor,
            },
            line: {
              color: axesColor,
              strokeWidth: axesStrokeWidth,
            },
            ticks: {
              color: axesColor,
              width: axesStrokeWidth,
            },
          },
        }}
        font={fonts.Lato}
      />
      <Settings.Stack>
        <SlidingSelect
          value={data}
          options={[
            { label: 'Data A', value: datasetA },
            { label: 'Data B', value: datasetB },
            { label: 'Data C', value: datasetC },
            // { label: 'Data D', value: datasetD },
          ]}
          width={width - 20}
          onChange={setData}
        />
        <Settings.Group title="General">
          <Settings.Switch
            label="Animated"
            value={animated}
            onChange={setAnimated}
          />
          <Settings.Switch
            label="Stacked"
            value={stacked}
            onChange={setStacked}
          />
          <Settings.Switch
            label="Normalize"
            value={normalized}
            onChange={setNormalized}
          />
          <Settings.Slider
            label="Opacity"
            defaultValue={opacity}
            min={0}
            max={1}
            step={0.05}
            labelPrecision={2}
            onValueChange={throttle(setOpacity, 30)}
          />
          <Settings.Slider
            label="Stroke"
            defaultValue={stroke}
            min={0}
            max={10}
            step={1}
            onValueChange={throttle(setStroke, 30)}
          />
        </Settings.Group>
        <Settings.Group title="Axes">
          <Settings.ColorPicker
            label="Color"
            color={axesColor}
            onColorPicked={setAxesColor}
          />
          <Settings.Switch
            label="Show ticks"
            value={showAxesTicks}
            onChange={setShowAxesTicks}
          />
          <Settings.Slider
            label="Stroke width"
            defaultValue={axesStrokeWidth}
            min={0}
            max={5}
            step={1}
            onValueChange={throttle(setAxesStrokeWidth, 50)}
          />
        </Settings.Group>
        <Settings.Group title="Legend">
          <Settings.Switch
            label="Enable"
            value={showLegend}
            onChange={setShowLegend}
          />
          <Settings.Slider
            label="Font size"
            defaultValue={legendFontSize}
            min={10}
            max={18}
            step={1}
            onValueChange={throttle(setLegendFontSize, 30)}
          />
        </Settings.Group>
      </Settings.Stack>
    </ScreenContainer>
  );
};

export default AreaChartScreen;
