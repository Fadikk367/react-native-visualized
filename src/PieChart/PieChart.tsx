import React from 'react';

import { Circle, Path, Skia } from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
import SliceSpaces from './SliceSpaces';
import type { PieChartProps } from './types';

const PieChart = ({
  width,
  height,
  data,
  startAngle: customStartAngle = 0,
  cutoutRadius = 0,
  spacing = 0,
  padding: customPadding,
  backgroundColor,
}: PieChartProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const contentWidth = width - (padding.left + padding.right);
  const contentHeight = height - (padding.top + padding.bottom);

  const boundingSquareSize = Math.min(contentWidth, contentHeight);
  const boundingSquareX = (contentWidth - boundingSquareSize) / 2;
  const center = {
    x: boundingSquareX + boundingSquareSize / 2,
    y: boundingSquareSize / 2,
  };
  const boundingSquare = {
    x: boundingSquareX,
    y: 0,
    width: boundingSquareSize,
    height: boundingSquareSize,
  };

  const total = data.reduce((acc, current) => acc + current.value, 0);
  const dataWithSweepAngles = data.map(slice => ({
    ...slice,
    sweepAngle: (slice.value / total) * 360,
  }));
  const dataWithAngles = dataWithSweepAngles.map((slice, index, arr) => {
    let sliceStartAngle = customStartAngle;
    for (let i = 0; i < index; i++) {
      sliceStartAngle += (arr[i]?.value! / total) * 360;
    }
    return {
      ...slice,
      startAngle: sliceStartAngle,
    };
  });

  const slices = dataWithAngles.map(
    ({ label, color, startAngle, sweepAngle }) => {
      const path = Skia.Path.Make();

      path.moveTo(0, 0);
      path.addArc(boundingSquare, startAngle, sweepAngle);
      path.lineTo(center.x, center.y);

      return (
        <Path
          key={label}
          path={path}
          style="fill"
          color={color}
          strokeWidth={0}
        />
      );
    },
  );

  const startAngles = dataWithAngles.map(({ startAngle }) => startAngle);

  return (
    <ChartContainer
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}>
      {slices}
      {cutoutRadius ? (
        <Circle cx={center.x} cy={center.y} r={cutoutRadius} color="white" />
      ) : null}
      {spacing > 0 ? (
        <SliceSpaces
          angles={startAngles}
          spacing={spacing}
          center={center}
          radius={boundingSquareSize / 2}
        />
      ) : null}
    </ChartContainer>
  );
};

export default PieChart;
