import React from 'react';

import { Chart } from 'react-native-visualized';

import { fonts } from '@/theme/fonts';

import type { RingData } from '../types';
import Card from './Card';

interface ActivityRingsProps {
  data: RingData[];
  width: number;
}

const ActivityRings = ({ data, width }: ActivityRingsProps) => {
  const activityCompletion =
    data.reduce((acc, curr) => acc + curr.value / curr.full, 0) / 3;

  const centerLabel = {
    fontSize: 14,
    text: `${(activityCompletion * 100).toFixed(0)}%`,
  };

  const legendConfig = {
    position: 'right' as const,
    height: 70,
    width: 150,
    gap: 0,
    fontSize: 12,
    marker: { size: 16, radius: 6 },
    formatLabel: formatActivityLabel,
  };

  return (
    <Card title="Activity">
      <Chart.ProgressRing
        data={data}
        width={width}
        height={140}
        ringWidth={12}
        padding={{ top: 8 }}
        centerLabel={centerLabel}
        ringsSpacing={2}
        legend={legendConfig}
        font={fonts.OpenSans}
        fontSize={12}
      />
    </Card>
  );
};

export default ActivityRings;

const formatActivityLabel = (value: string, extras: undefined) => {
  // FIXME: Casting due to typing issue in react-native-visualized
  const castedExtras = extras! as { value: number; full: number };
  return `${value} (${castedExtras.value.toFixed(
    0,
  )}/${castedExtras.full.toFixed(0)})`;
};
