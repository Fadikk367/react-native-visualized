import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer/ScreenContainer';
import Settings from '@/components/Settings';
import { getFontOptions } from '@/theme/fonts';
import { throttle } from '@/utils/throttle';

import { dataset } from './data';

type LegendPosition = 'left' | 'right' | 'top' | 'bottom';

const PieChart = () => {
  const [cutoutRadius, setCutoutRadius] = useState(80);
  const [spacing, setSpacing] = useState(8);
  const [startAngle, setStartAngle] = useState(0);
  const [legendMarkerSize, setLegendMarkerSize] = useState(24);
  const [legendMarkerRadius, setLegendMarkerRadius] = useState(6);
  const [isCenterLabelShown, setIsCenterLabelShown] = useState(false);
  const [legendPosition, setLegendPosition] = useState<LegendPosition>('right');
  const fontOptions = getFontOptions();

  const { width } = useWindowDimensions();

  const [font, setFont] = useState<(typeof fontOptions)[number]>(
    fontOptions[3]!,
  );

  const total = dataset.reduce((acc, { value }) => acc + value, 0);

  const centerLabel = isCenterLabelShown
    ? {
        label: { text: `$${total.toFixed(2)}`, fontSize: 18 },
        annotation: { text: 'Total:', fontSize: 14 },
        gap: 10,
      }
    : undefined;

  const legendSizeByPosition = {
    left: { width: 70, height: 160 },
    top: { width, height: legendMarkerSize * 2 + 10 },
    right: { width: 70, height: 160 },
    bottom: { width, height: legendMarkerSize * 2 + 10 },
  };

  const legendLayoutByPosition = {
    left: undefined,
    top: { rows: 2, columns: 3 },
    right: undefined,
    bottom: { rows: 2, columns: 3 },
  };

  const legendConfig = {
    ...legendSizeByPosition[legendPosition],
    layout: legendLayoutByPosition[legendPosition],
    gap: 10,
    position: legendPosition,
    marker: { size: legendMarkerSize, radius: legendMarkerRadius },
    fontSize: 12,
  };

  return (
    <ScreenContainer>
      <Chart.Pie
        width={width}
        height={300}
        data={dataset}
        startAngle={-90 + startAngle}
        cutoutRadius={cutoutRadius}
        spacing={spacing}
        padding={{ top: 10, left: 10, right: 10, bottom: 10 }}
        legend={legendConfig}
        centerLabel={centerLabel}
        backgroundColor="#fff"
        font={font.value}
      />
      <Settings.Stack>
        <Settings.Group title="General">
          <Settings.Slider
            label="Cutout"
            defaultValue={cutoutRadius}
            min={0}
            max={100}
            step={2}
            onValueChange={throttle(setCutoutRadius, 30)}
          />
          <Settings.Slider
            label="Slices spacing"
            defaultValue={spacing}
            min={0}
            max={20}
            step={1}
            onValueChange={throttle(setSpacing, 50)}
          />
          <Settings.Slider
            label="Start angle"
            defaultValue={startAngle}
            min={0}
            max={360}
            step={5}
            onValueChange={throttle(setStartAngle, 20)}
          />
          <Settings.FontSelect
            label="Font"
            value={font}
            options={fontOptions}
            onChange={setFont}
          />
        </Settings.Group>
        <Settings.Group title="Center label">
          <Settings.Switch
            label="Enable"
            value={isCenterLabelShown}
            onChange={() => setIsCenterLabelShown(prev => !prev)}
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
          <Settings.ToggleGroup<LegendPosition>
            label="Position"
            value={legendPosition}
            onChange={value => setLegendPosition(value)}
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
        </Settings.Group>
      </Settings.Stack>
    </ScreenContainer>
  );
};

export default PieChart;
