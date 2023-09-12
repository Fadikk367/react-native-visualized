import React from 'react';

import { Chart } from 'react-native-visualized';

import { fonts } from '@/theme/fonts';

import type { BarData } from '../types';
import Card from './Card';

interface ActivityRingsProps {
  data: BarData[];
  width: number;
}

const SleepChart = ({ data, width }: ActivityRingsProps) => {
  return (
    <Card title="Sleep [ h ]">
      <Chart.Bar
        animated
        data={data}
        yTicks={[2, 4, 6, 8, 10]}
        yDomain={[0, 12]}
        width={width}
        height={160}
        font={fonts.OpenSans}
        padding={{ right: 16 }}
        barRatio={0.4}
        barRadius={12}
        barColor={'#6189ff'}
        showLines
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
        fontSize={12}
      />
    </Card>
  );
};

export default SleepChart;
