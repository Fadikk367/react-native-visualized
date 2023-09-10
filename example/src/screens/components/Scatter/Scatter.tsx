import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { Chart, utils } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';
import Settings from '@/components/Settings';
import SlidingSelect from '@/components/SlidingSelect';
import { getFontOptions } from '@/theme/fonts';
import { throttle } from '@/utils/throttle';

import CustomMarker from './CustomMarker';
import { datasetCategorical, datasetContinuous } from './data';

const datasetOptions = [
  { label: 'Categorical', value: datasetCategorical },
  { label: 'Continuous', value: datasetContinuous },
];

const { Scatter } = Chart;

type MarkerType = 'dot' | 'cross' | 'square';

const ScatterScreen = () => {
  //General
  const [dataset, setDataset] = useState<(typeof datasetOptions)[number]>(
    datasetOptions[0]!,
  );
  const fontOptions = getFontOptions();
  const [legendShown, setLegendShown] = useState(true);
  const [showGridlines, setShowGridlines] = useState(true);
  const [font, setFont] = useState<(typeof fontOptions)[number]>(
    fontOptions[3]!,
  );

  //Marker
  const [isCustomComponent, setIsCustomComponent] = useState(false);
  const [markerType, setMarkerType] = useState<MarkerType>('dot');
  const [markerSize, setMarkerSize] = useState(7);

  // Axes
  const [fontSize, setFontSize] = useState(14);
  const [lineWidth, setLineWidth] = useState(1);
  const [showTicks, setShowTicks] = useState(true);

  const { width } = useWindowDimensions();

  const xTicks = utils.linspace(0, 100, 20);
  const yTicks = utils.linspace(0, 100, 20);

  const legendConfig = {
    fontSize: 12,
    height: 30,
    width,
    position: 'top',
    font: font.value,
    marker: {
      size: 18,
      radius: 8,
    },
    items: [
      { color: '#df6767', label: 'series A' },
      { color: '#4fb551', label: 'series B' },
      { color: '#61a0d8', label: 'series C' },
    ],
  } as const;

  const gridlinesConfig = {
    vertical: true,
    horizontal: true,
    lineWidth: 1,
    opacity: 0.2,
  };

  return (
    <ScreenContainer>
      <Scatter
        width={width}
        height={300}
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        valueDomain={[0, 50]}
        valueDomainColors={['lightskyblue', 'blue']}
        xTicks={xTicks}
        yTicks={yTicks}
        backgroundColor="white"
        // @ts-ignore
        data={dataset.value}
        padding={{
          top: legendShown && dataset.label === 'Categorical' ? 5 : 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        // @ts-ignore
        legend={
          legendShown && dataset.label === 'Categorical'
            ? legendConfig
            : undefined
        }
        marker={{
          variant: markerType,
          size: markerSize,
        }}
        xAxis={{
          showTicks,
          style: {
            labels: {
              fontSize,
            },
            line: {
              strokeWidth: lineWidth,
            },
            ticks: {
              width: lineWidth,
            },
          },
        }}
        yAxis={{
          showTicks,
          style: {
            labels: {
              fontSize,
            },
            line: {
              strokeWidth: lineWidth,
            },
            ticks: {
              width: lineWidth,
            },
          },
        }}
        renderMarker={isCustomComponent ? CustomMarker : undefined}
        gridlines={showGridlines ? gridlinesConfig : null}
        showContinuousLegend={legendShown && dataset.label === 'Continuous'}
        font={font.value}
        fontSize={fontSize}
      />
      <Settings.Stack>
        <SlidingSelect
          width={width - 20}
          // @ts-ignore
          value={dataset}
          // @ts-ignore
          options={datasetOptions}
          onChange={setDataset}
        />
        <Settings.Group title="General">
          <Settings.Switch
            label="Show gridlines"
            value={showGridlines}
            onChange={setShowGridlines}
          />
          <Settings.Switch
            label="Show legend"
            value={legendShown}
            onChange={setLegendShown}
          />
          <Settings.FontSelect
            label="Font"
            value={font}
            options={fontOptions}
            onChange={setFont}
          />
        </Settings.Group>
        <Settings.Group title="Marker">
          <Settings.Switch
            label="Custom component"
            value={isCustomComponent}
            onChange={setIsCustomComponent}
          />
          <Settings.ToggleGroup<MarkerType>
            label="Type"
            value={markerType}
            options={[
              { icon: 'circle', value: 'dot' },
              { icon: 'plus', value: 'cross' },
              { icon: 'square', value: 'square' },
            ]}
            onChange={setMarkerType}
          />
          <Settings.Slider
            label="Size"
            defaultValue={markerSize}
            min={5}
            max={13}
            step={2}
            onValueChange={throttle(setMarkerSize, 50)}
          />
        </Settings.Group>
        <Settings.Group title="Axes">
          <Settings.Slider
            label="Font size"
            defaultValue={fontSize}
            min={10}
            max={18}
            step={1}
            onValueChange={throttle(setFontSize, 50)}
          />
          <Settings.Slider
            label="Line width"
            defaultValue={lineWidth}
            min={0}
            max={4}
            step={0.5}
            onValueChange={throttle(setLineWidth, 50)}
          />
          <Settings.Switch
            label="Show ticks"
            value={showTicks}
            onChange={setShowTicks}
          />
        </Settings.Group>
      </Settings.Stack>
    </ScreenContainer>
  );
};

export default ScatterScreen;
