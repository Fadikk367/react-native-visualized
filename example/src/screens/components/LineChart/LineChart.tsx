import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';
import Settings from '@/components/Settings';
import SlidingSelect from '@/components/SlidingSelect';
import { fonts } from '@/theme/fonts';
import { throttle } from '@/utils/throttle';

import { datasets } from './data';

const { LineChart } = Chart;

const datasetOptions = [
  { label: 'Data A', value: datasets[0]! },
  { label: 'Data B', value: datasets[1]! },
  { label: 'Data C', value: datasets[2]! },
];

const LineChartScreen = () => {
  const [dataset, setDataset] = useState(datasetOptions[0]!);
  const [dataLineWidth, setDataLineWidth] = useState(3);
  const [lineAColor, setLineAColor] = useState('#a75757');
  const [lineBColor, setLineBColor] = useState('#7aa0c6');

  // Gridlines
  const [horizontalLinesShown, setHorizontalLinesShown] = useState(true);
  const [verticalLinesShown, setVerticalLinesShown] = useState(false);
  const [gridlinesWidth, setGridlinesWidth] = useState(1);
  const [gridlinesOpacity, setGridlinesOpacity] = useState(0.2);
  const [gridlinesColor, setGridlinesColor] = useState('#000000');

  // X Axis
  const [xAxisWidth, setXAxisWidth] = useState(2);
  const [showXAxisTicks, setShowXAxisTicks] = useState(false);
  const [showXAxisBaseLine, setShowXAxisBaseLine] = useState(true);
  const [xAxisFontSize, setXAxisFontSize] = useState(16);
  const [xAxisTicksStep, setXAxisTicksStep] = useState(10);
  const [xAxisColor, setXAxisColor] = useState('#000000');

  // Y Axis
  const [yAxisWidth, setYAxisWidth] = useState(2);
  const [showYAxisTicks, setShowYAxisTicks] = useState(false);
  const [showYAxisBaseLine, setShowYAxisBaseLine] = useState(false);
  const [yAxisFontSize, setYAxisFontSize] = useState(16);
  const [yAxisTicksStep, setYAxisTicksStep] = useState(20);
  const [yAxisColor, setYAxisColor] = useState('#838383');

  const { width } = useWindowDimensions();

  const xLabels = utils.linspace(0, 100, xAxisTicksStep);
  const yLabels = utils.linspace(0, 100, yAxisTicksStep);

  return (
    <ScreenContainer>
      <LineChart
        width={width}
        height={320}
        backgroundColor="#ffffff"
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        xTicks={xLabels}
        yTicks={yLabels}
        data={[
          {
            label: 'Data A',
            points: dataset.value.lineA,
            color: lineAColor,
            strokeWidth: dataLineWidth,
          },
          {
            label: 'Data B',
            points: dataset.value.lineB,
            color: lineBColor,
            strokeWidth: dataLineWidth,
          },
        ]}
        padding={{ top: 10, bottom: 10, left: 15, right: 20 }}
        gridlines={{
          horizontal: horizontalLinesShown,
          vertical: verticalLinesShown,
          lineWidth: gridlinesWidth,
          opacity: gridlinesOpacity,
          color: gridlinesColor,
        }}
        legend={{
          marker: { width: 30, height: 4, radius: 2 },
          position: 'top',
          height: 40,
        }}
        xAxis={{
          showTicks: showXAxisTicks,
          showLine: showXAxisBaseLine,
          style: {
            line: {
              strokeWidth: xAxisWidth,
              color: xAxisColor,
            },
            ticks: {
              width: xAxisWidth,
              color: xAxisColor,
            },
            labels: {
              fontSize: xAxisFontSize,
              color: xAxisColor,
            },
          },
        }}
        yAxis={{
          showLine: showYAxisBaseLine,
          showTicks: showYAxisTicks,
          width: 40,
          formatLabel: tick => tick.toFixed(1),
          style: {
            line: {
              strokeWidth: yAxisWidth,
              color: yAxisColor,
            },
            ticks: {
              width: yAxisWidth,
              color: yAxisColor,
            },
            labels: {
              fontSize: yAxisFontSize,
              color: yAxisColor,
            },
          },
        }}
        font={fonts.Lato}
      />
      <Settings.Stack>
        <SlidingSelect
          width={width - 20}
          value={dataset}
          options={datasetOptions}
          onChange={setDataset}
        />
        <Settings.Group title="Data">
          <Settings.Slider
            label="Line width"
            min={0}
            max={6}
            step={0.5}
            labelPrecision={1}
            defaultValue={dataLineWidth}
            onValueChange={throttle(setDataLineWidth, 50)}
          />
          <Settings.ColorPicker
            label="Line A color"
            color={lineAColor}
            onColorPicked={setLineAColor}
          />
          <Settings.ColorPicker
            label="Line B color"
            color={lineBColor}
            onColorPicked={setLineBColor}
          />
        </Settings.Group>
        <Settings.Group title="Gridlines">
          <Settings.Switch
            label="Horizontal"
            value={horizontalLinesShown}
            onChange={setHorizontalLinesShown}
          />
          <Settings.Switch
            label="Vertical"
            value={verticalLinesShown}
            onChange={setVerticalLinesShown}
          />
          <Settings.Slider
            label="Stroke width"
            min={0}
            max={4}
            step={0.25}
            defaultValue={gridlinesWidth}
            onValueChange={throttle(setGridlinesWidth, 50)}
          />
          <Settings.Slider
            label="Opacity"
            min={0}
            max={1}
            step={0.1}
            defaultValue={gridlinesOpacity}
            onValueChange={throttle(setGridlinesOpacity, 50)}
          />
          <Settings.ColorPicker
            label="Color"
            color={gridlinesColor}
            onColorPicked={setGridlinesColor}
          />
        </Settings.Group>
        <Settings.Group title="X Axis">
          <Settings.Switch
            label="Show ticks"
            value={showXAxisTicks}
            onChange={setShowXAxisTicks}
          />
          <Settings.Switch
            label="Show base line"
            value={showXAxisBaseLine}
            onChange={setShowXAxisBaseLine}
          />
          <Settings.Slider
            label="Ticks step"
            min={5}
            max={25}
            step={5}
            defaultValue={xAxisTicksStep}
            onValueChange={throttle(setXAxisTicksStep, 50)}
          />
          <Settings.Slider
            label="Stroke width"
            min={0}
            max={5}
            step={0.5}
            labelPrecision={1}
            defaultValue={xAxisWidth}
            onValueChange={throttle(setXAxisWidth, 50)}
          />
          <Settings.Slider
            label="Font size"
            min={8}
            max={18}
            step={2}
            defaultValue={xAxisFontSize}
            onValueChange={throttle(setXAxisFontSize, 50)}
          />
          <Settings.ColorPicker
            label="Color"
            color={xAxisColor}
            onColorPicked={setXAxisColor}
          />
        </Settings.Group>
        <Settings.Group title="Y Axis">
          <Settings.Switch
            label="Show ticks"
            value={showYAxisTicks}
            onChange={setShowYAxisTicks}
          />
          <Settings.Switch
            label="Show base line"
            value={showYAxisBaseLine}
            onChange={setShowYAxisBaseLine}
          />
          <Settings.Slider
            label="Ticks step"
            min={10}
            max={25}
            step={5}
            defaultValue={yAxisTicksStep}
            onValueChange={throttle(setYAxisTicksStep, 50)}
          />
          <Settings.Slider
            label="Stroke width"
            min={0}
            max={5}
            step={0.5}
            labelPrecision={1}
            defaultValue={yAxisWidth}
            onValueChange={throttle(setYAxisWidth, 50)}
          />
          <Settings.Slider
            label="Font size"
            min={10}
            max={20}
            step={2}
            defaultValue={yAxisFontSize}
            onValueChange={throttle(setYAxisFontSize, 50)}
          />
          <Settings.ColorPicker
            label="Color"
            color={yAxisColor}
            onColorPicked={setYAxisColor}
          />
        </Settings.Group>
      </Settings.Stack>
    </ScreenContainer>
  );
};

export default LineChartScreen;
