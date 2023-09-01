import type {
  Dimensions,
  GetLegendItemLayout,
  GridLayout,
  LegendPosition,
  Orientation,
} from './types';

export const getLegendItemLayout: GetLegendItemLayout = ({
  width,
  height,
  itemsCount,
  orientation,
  rows,
  columns,
}) => {
  const horizontalLayoutGetter = (index: number) => {
    const itemWidth = width / columns;
    const itemHeight = height / rows;
    return {
      x: (index % columns) * itemWidth,
      y: Math.floor(index / columns) * itemHeight,
      height: itemHeight,
      width: itemWidth,
    };
  };

  const verticalLayoutGetter = (index: number) => {
    const itemSize = height / itemsCount;
    return {
      x: 0,
      y: index * itemSize,
      height: itemSize,
      width,
    };
  };

  return {
    vertical: verticalLayoutGetter,
    horizontal: horizontalLayoutGetter,
  }[orientation];
};

export const getOrientation = (position: LegendPosition): Orientation => {
  if (position === 'left' || position === 'right') return 'vertical';
  return 'horizontal';
};

export const getMarkerDimensions = (
  rectangular: Dimensions | { size: number },
): Dimensions => {
  return 'height' in rectangular
    ? rectangular
    : { height: rectangular.size, width: rectangular.size };
};

export const getDefaultLayoutForOrientation = (
  itemsCount: number,
  orientation: Orientation,
): GridLayout => {
  return orientation === 'horizontal'
    ? { rows: 1, columns: itemsCount }
    : { rows: itemsCount, columns: 1 };
};
