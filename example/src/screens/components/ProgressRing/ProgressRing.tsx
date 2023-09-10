import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer/ScreenContainer';
import Settings from '@/components/Settings';
import SlidingSelect from '@/components/SlidingSelect';
import { fonts } from '@/theme/fonts';
import { throttle } from '@/utils/throttle';

import { ringsA, ringsB, ringsC } from './data';

const datasetOptions = [
  { label: 'Rings A', value: ringsA },
  { label: 'Rings B', value: ringsB },
  { label: 'Rings C', value: ringsC },
];

const ProgressRing = () => {
  const { width } = useWindowDimensions();
  const [dataset, setDataset] = useState(datasetOptions[0]!);
  const [spacing, setSpacing] = useState(4);
  const [ringWidth, setRingWidth] = useState(20);

  // Legend
  const [legendMarkerSize, setLegendMarkerSize] = useState(24);
  const [legendMarkerRadius, setLegendMarkerRadius] = useState(6);
  const [legendGap, setLegendGap] = useState(10);

  // Center Label
  const [showCenterLabel, setShowCenterLabel] = useState(true);
  const [centerLabelText, setCenterLabelText] = useState('78%');
  const [centerLabelFontSize, setCenterLabelFontSize] = useState(24);
  const [centerLabelColor, setCenterLabelColor] = useState('#000000');

  return (
    <ScreenContainer>
      <Chart.ProgressRing
        width={width}
        height={320}
        data={dataset.value}
        padding={{ top: 10, left: 10, right: 10, bottom: 10 }}
        ringWidth={ringWidth}
        ringsSpacing={spacing}
        legend={{
          height: 30,
          width,
          position: 'bottom',
          marker: {
            radius: legendMarkerRadius,
            size: legendMarkerSize,
          },
          gap: legendGap,
        }}
        centerLabel={
          showCenterLabel
            ? {
                text: centerLabelText,
                fontSize: centerLabelFontSize,
                color: centerLabelColor,
              }
            : undefined
        }
        font={fonts.Lato}
        backgroundColor="#fff"
      />
      <Settings.Stack>
        <SlidingSelect
          width={width - 20}
          value={dataset}
          options={datasetOptions}
          onChange={setDataset}
        />
        <Settings.Group title="General">
          <Settings.Slider
            label="Ring width"
            defaultValue={ringWidth}
            min={0}
            max={40}
            step={1}
            onValueChange={throttle(setRingWidth, 50)}
          />
          <Settings.Slider
            label="Rings spacing"
            defaultValue={spacing}
            min={0}
            max={20}
            step={1}
            onValueChange={throttle(setSpacing, 30)}
          />
        </Settings.Group>
        <Settings.Group title="Center label">
          <Settings.Switch
            label="Enable"
            value={showCenterLabel}
            onChange={setShowCenterLabel}
          />
          <Settings.TextInput
            label="Content"
            value={centerLabelText}
            onChangeText={throttle(setCenterLabelText, 50)}
          />
          <Settings.ColorPicker
            label="Color"
            color={centerLabelColor}
            onColorPicked={setCenterLabelColor}
          />
          <Settings.Slider
            label="Font size"
            min={10}
            max={32}
            step={2}
            defaultValue={centerLabelFontSize}
            onValueChange={throttle(setCenterLabelFontSize, 50)}
          />
        </Settings.Group>
        <Settings.Group title="legend">
          <Settings.Slider
            label="Marker size"
            min={12}
            max={32}
            defaultValue={legendMarkerSize}
            onValueChange={throttle(setLegendMarkerSize, 50)}
          />
          <Settings.Slider
            label="Marker radius"
            min={0}
            max={16}
            defaultValue={legendMarkerRadius}
            onValueChange={throttle(setLegendMarkerRadius, 50)}
          />
          <Settings.Slider
            label="Gap"
            min={0}
            max={40}
            step={5}
            defaultValue={legendGap}
            onValueChange={throttle(setLegendGap, 50)}
          />
        </Settings.Group>
      </Settings.Stack>
    </ScreenContainer>
  );
};

export default ProgressRing;
