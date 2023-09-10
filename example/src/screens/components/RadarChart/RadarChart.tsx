import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';
import Settings from '@/components/Settings';
import SlidingSelect from '@/components/SlidingSelect';
import { getFontOptions } from '@/theme/fonts';
import { throttle } from '@/utils/throttle';

import { datasets } from './data';

type LegendPosition = 'left' | 'right' | 'top' | 'bottom';
type LabelsOrientation = 'radial' | 'horizontal';

const datasetOptions = [
  { label: 'Data A', value: datasets[0]! },
  { label: 'Data B', value: datasets[1]! },
  { label: 'Data C', value: datasets[2]! },
];

const RadarChart = () => {
  const fontOptions = getFontOptions();

  const [dataset, setDataset] = useState(datasetOptions[0]!);
  const [labelsOrientation, setLabelsOrientation] =
    useState<LabelsOrientation>('radial');
  const [labelsPadding, setLabelsPadding] = useState(30);
  const [chartHeight, setChartHeight] = useState(360);
  const [font, setFont] = useState<(typeof fontOptions)[number]>(
    fontOptions[3]!,
  );
  const [fontSize, setFontSize] = useState(12);
  const { width } = useWindowDimensions();

  // Legend
  const [legendMarkerSize, setLegendMarkerSize] = useState(20);
  const [legendMarkerRadius, setLegendMarkerRadius] = useState(4);
  const [legendFontSize, setLegendFontSize] = useState(12);
  const [legendGap, setLegendGap] = useState(10);
  const [legendPosition, setLegendPosition] =
    useState<LegendPosition>('bottom');

  const legendSizeByPosition = {
    left: { width: 80, height: 100 },
    top: { width, height: legendMarkerSize + 5 },
    right: { width: 80, height: 100 },
    bottom: { width, height: legendMarkerSize + 5 },
  };

  const legendConfig = {
    ...legendSizeByPosition[legendPosition],
    gap: legendGap,
    position: legendPosition,
    marker: { size: legendMarkerSize, radius: legendMarkerRadius },
    fontSize: legendFontSize,
  };

  return (
    <ScreenContainer>
      <Chart.Radar
        width={width}
        height={chartHeight}
        backgroundColor="#ffffff"
        variables={['agility', 'strength', 'durability', 'luck', 'speech']}
        padding={{ left: 10, right: 10 }}
        ticks={[1, 2, 3, 4, 5]}
        domain={[0, 5]}
        data={dataset.value}
        labelsOrientation={labelsOrientation}
        labelsPadding={labelsPadding}
        legend={legendConfig}
        font={font.value}
        fontSize={fontSize}
      />
      <Settings.Stack>
        <SlidingSelect
          value={dataset}
          width={width - 20}
          options={datasetOptions}
          onChange={setDataset}
        />
        <Settings.Group title="General">
          <Settings.Slider
            label="Height"
            min={200}
            max={400}
            step={20}
            defaultValue={chartHeight}
            onSlidingComplete={setChartHeight}
          />
          <Settings.Slider
            label="Labels padding"
            min={0}
            max={80}
            defaultValue={labelsPadding}
            onValueChange={throttle(setLabelsPadding, 50)}
          />
          <Settings.ToggleGroup<LabelsOrientation>
            label="Labels orientation"
            value={labelsOrientation}
            options={[
              { value: 'horizontal', icon: 'drag-horizontal-variant' },
              { value: 'radial', icon: 'circle-expand' },
            ]}
            onChange={setLabelsOrientation}
          />
          <Settings.FontSelect
            label="Font"
            value={font}
            options={fontOptions}
            onChange={setFont}
          />
          <Settings.Slider
            label="Font size"
            defaultValue={fontSize}
            min={10}
            max={20}
            onValueChange={throttle(setFontSize, 50)}
          />
        </Settings.Group>
        <Settings.Group title="Legend">
          <Settings.ToggleGroup<LegendPosition>
            label="Position"
            value={legendPosition}
            onChange={setLegendPosition}
            options={[
              {
                value: 'left',
                icon: 'format-horizontal-align-left',
              },
              {
                value: 'top',
                icon: 'format-vertical-align-top',
              },
              {
                value: 'right',
                icon: 'format-horizontal-align-right',
              },
              {
                value: 'bottom',
                icon: 'format-vertical-align-bottom',
              },
            ]}
          />
          <Settings.Slider
            label="Gap"
            min={0}
            max={30}
            step={5}
            defaultValue={legendGap}
            onValueChange={throttle(setLegendGap, 50)}
          />
          <Settings.Slider
            label="Marker size"
            min={10}
            max={24}
            defaultValue={legendMarkerSize}
            onValueChange={throttle(setLegendMarkerSize, 50)}
          />
          <Settings.Slider
            label="Marker border radius"
            min={0}
            max={12}
            defaultValue={legendMarkerRadius}
            onValueChange={throttle(setLegendMarkerRadius, 50)}
          />
          <Settings.Slider
            label="Font size"
            min={10}
            max={20}
            step={2}
            defaultValue={legendFontSize}
            onValueChange={throttle(setLegendFontSize, 50)}
          />
        </Settings.Group>
      </Settings.Stack>
    </ScreenContainer>
  );
};

export default RadarChart;
