import React from 'react';

import {
  DataSourceParam,
  Group,
  LinearGradient,
  RoundedRect,
  Text,
  useFont,
  vec,
} from '@shopify/react-native-skia';

// TODO: Enable importing types from library
export interface BarProps {
  value: number;
  space: number;
  ratio: number;
  base: number;
  font: DataSourceParam;
  mapDomainToCanvas(v: number): number;
}

const CustomBar = ({
  value,
  space,
  base,
  font: fontSource,
  mapDomainToCanvas,
}: BarProps) => {
  const font = useFont(fontSource, 18);
  const barHeight = mapDomainToCanvas(value) - mapDomainToCanvas(base);
  const barWidth = space * 0.8;

  return (
    <Group>
      <RoundedRect
        x={(space - barWidth) / 2}
        y={mapDomainToCanvas(base)}
        height={barHeight}
        width={barWidth}
        r={5}
        color="gray"
        opacity={0.7}>
        <LinearGradient
          start={vec(0, mapDomainToCanvas(base))}
          end={vec(0, mapDomainToCanvas(value))}
          colors={['transparent', '#be4343']}
          positions={[0, 0.5]}
        />
      </RoundedRect>
      {font && (
        <>
          <RoundedRect
            x={(space - barWidth) / 2 - 3}
            y={mapDomainToCanvas(value) - 30}
            height={30}
            width={barWidth + 6}
            r={5}
            color="#c34e4e"
          />
          <Group
            transform={[{ rotate: Math.PI }]}
            origin={{ x: space / 2, y: mapDomainToCanvas(value) }}>
            <Text
              font={font}
              x={(space - font.getTextWidth(value.toString())) / 2}
              y={mapDomainToCanvas(value) + 20}
              text={value.toString()}
            />
          </Group>
        </>
      )}
    </Group>
  );
};

export default CustomBar;
