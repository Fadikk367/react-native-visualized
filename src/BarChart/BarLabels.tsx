import React from 'react';

import { DataSourceParam, Group, useFont } from '@shopify/react-native-skia';

import BarLabel from './BarLabel';

interface BarLabelsProps {
  data: { label: string }[];
  fontSize: number;
  font: DataSourceParam;
  barSpace: number;
}

const BarLabels = ({
  data,
  fontSize,
  font: fontSource,
  barSpace,
}: BarLabelsProps) => {
  const font = useFont(fontSource, fontSize);

  const barLabels = data.map(({ label }, index) => {
    return (
      <Group key={label} transform={[{ translateX: barSpace * index }]}>
        <BarLabel
          label={label}
          space={barSpace}
          height={29}
          font={font}
          fontSize={fontSize}
        />
      </Group>
    );
  });

  return <>{barLabels}</>;
};

export default BarLabels;
