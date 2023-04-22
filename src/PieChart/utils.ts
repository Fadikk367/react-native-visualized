import type { CalculatePieChartLayout, CalculateSlicesAngles } from './types';

export const calculatePieChartLayout: CalculatePieChartLayout = ({
  width,
  height,
  padding,
  gap,
  legendWidth,
  legendPosition: customLegendPosition,
}) => {
  // Content means space for chart itself, excluding extra elements like legend
  const contentWidth =
    width - (padding.left + legendWidth + gap + padding.right);
  const contentHeight = height - (padding.top + padding.bottom);

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
    x: customLegendPosition === 'left' ? legendWidth + gap : 0,
    y: 0,
  };

  const legendPosition = {
    x: customLegendPosition === 'left' ? 0 : contentWidth + gap,
    y: 0,
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

export const calculateSlicesAngles: CalculateSlicesAngles = (
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
