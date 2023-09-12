import React from 'react';

import { Chart } from 'react-native-visualized';

import { fonts } from '@/theme/fonts';

import type { PointData } from '../types';
import Card from './Card';

interface ActivityRingsProps {
  data: PointData[];
  width: number;
}

const HeartRateChart = ({ data, width }: ActivityRingsProps) => {
  const areaData = {
    points: data,
    color: '#c85151',
    label: 'HeartRate',
    stroke: 4,
    opacity: 0.8,
    fill: {
      colors: ['#ffffff', '#d86c6c'],
      positions: [0.3, 0.9],
      start: { x: 0, y: 160 },
      end: { x: 0, y: 0 },
    },
  };

  return (
    <Card title="Heart Rate [ bpm ]">
      <Chart.AreaChart
        animated
        width={width}
        height={140}
        padding={{ left: 10, right: 20 }}
        xTicks={[0, 6, 12, 18, 24]}
        yTicks={[40, 80, 120, 160]}
        xDomain={[0, 24]}
        yDomain={[20, 180]}
        data={[areaData]}
        font={fonts.OpenSans}
        gridlines={{
          horizontal: true,
          opacity: 0.2,
          lineWidth: 0,
        }}
        xAxis={{
          formatLabel: formatTimeLabel,
          style: {
            labels: {
              fontSize: 10,
            },
            line: {
              color: '#909090',
              strokeWidth: 2,
            },
          },
          showTicks: false,
        }}
        yAxis={{
          showLine: false,
          style: {
            labels: {
              fontSize: 12,
              color: '#909090',
            },
          },
          showTicks: false,
        }}
      />
    </Card>
  );
};

export default HeartRateChart;

const formatTimeLabel = (hour: number): string => {
  if (hour % 24 === 0) return `12 AM`;
  else if (hour % 12 === 0) return '12 PM';
  else if (hour > 12) return `${hour - 12} PM`;
  else return `${hour} AM`;
};
