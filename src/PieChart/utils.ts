import type {
  GetContentDimensions,
  GetDataWithAngles,
  GetPieChartLayout,
} from './types';

export const getPieChartLayout: GetPieChartLayout = ({
  width,
  height,
  padding,
  legend,
}) => {
  // Content means space for chart itself, excluding extra elements like legend
  const { contentWidth, contentHeight } = getContentDimensions({
    width,
    height,
    padding,
    legend,
  });

  const boundingSquareSize = Math.min(contentWidth, contentHeight);
  const boundingSquareX = (contentWidth - boundingSquareSize) / 2;
  const boundingSquareY = (contentHeight - boundingSquareSize) / 2;

  const pieRadius = boundingSquareSize / 2;

  const pieCenter = {
    x: boundingSquareX + pieRadius,
    y: boundingSquareY + pieRadius,
  };

  // Bounding square is necessary for drawing arcs in Skia Path object
  const boundingSquare = {
    x: boundingSquareX,
    y: boundingSquareY,
    width: boundingSquareSize,
    height: boundingSquareSize,
  };

  const piePosition = {
    x: legend.position === 'left' ? legend.width + legend.gap : 0,
    y: legend.position === 'top' ? legend.height + legend.gap : 0,
  };

  const legendPosition = {
    x: legend.position === 'right' ? contentWidth + legend.gap : 0,
    y: legend.position === 'bottom' ? contentHeight + legend.gap : 0,
  };

  return {
    pie: {
      position: piePosition,
      boundingSquare,
      radius: pieRadius,
      center: pieCenter,
    },
    legend: {
      position: legendPosition,
    },
  };
};

export const getDataWithAngles: GetDataWithAngles = (
  data,
  total,
  startAngle,
) => {
  const dataWithSweepAngles = data.map(slice => ({
    ...slice,
    sweepAngle: (slice.value / total) * 360,
  }));

  const dataWithAngles = dataWithSweepAngles.map((slice, index, arr) => {
    let sliceStartAngle = startAngle;
    for (let i = 0; i < index; i++) {
      sliceStartAngle += arr[i]?.sweepAngle!;
    }

    return {
      ...slice,
      startAngle: sliceStartAngle,
    };
  });

  return dataWithAngles;
};

const getContentDimensions: GetContentDimensions = ({
  width,
  height,
  padding,
  legend,
}) => {
  const isHorizontalLayout =
    legend.position === 'left' || legend.position === 'right';

  const totalHorizontalPadding = padding.left + padding.right;
  const totalVerticalPadding = padding.top + padding.bottom;

  const legendWidth = isHorizontalLayout ? legend.width + legend.gap : 0;
  const legendHeight = isHorizontalLayout ? 0 : legend.height + legend.gap;

  const contentWidth = width - (totalHorizontalPadding + legendWidth);
  const contentHeight = height - (totalVerticalPadding + legendHeight);

  return { contentWidth, contentHeight };
};
