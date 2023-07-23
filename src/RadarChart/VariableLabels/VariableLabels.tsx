import React from 'react';

import HorizontalLabel from './HorizontalLabel';
import RadialLabel from './RadialLabel';
import type { VariableLabelsProps } from './types';

const VariableLabels = <T extends string>({
  variables,
  angles,
  orientation = 'radial',
  font,
  fontSize,
  center,
  radius,
}: VariableLabelsProps<T>) => {
  const LabelComponent =
    orientation === 'radial' ? RadialLabel : HorizontalLabel;

  if (!font) return null;

  return (
    <>
      {variables.map(variable => (
        <LabelComponent
          key={`${variable}/${angles[variable]}`}
          angle={angles[variable]}
          variable={variable}
          font={font}
          fontSize={fontSize}
          center={center}
          radius={radius}
        />
      ))}
    </>
  );
};

export default VariableLabels;
