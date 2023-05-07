import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Group, Path, SkPoint, rect } from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import XAxis from '../core/Axes/XAxis';
import YAxis from '../core/Axes/YAxis';
import ChartContainer from '../core/ChartContainer';
import Gridlines from '../core/Gridlines';
import { defaultPadding } from '../core/constants';
import { ensureDefaults, getIsWithinDomain } from '../core/utils';
import type { LineChartProps } from './types';
import { buildPath, extractProps } from './utils';

const LineChart = ({
  width,
  height,
  xDomain,
  yDomain,
  xTicks,
  yTicks,
  padding: customPadding,
  backgroundColor,
  font,
  gridlines: gridlinesConfig,
  xAxis,
  yAxis,
  children,
  onIndicatorChange,
}: LineChartProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const xAxisHeight = xAxis?.height || 30;
  const yAxisWidth = yAxis?.width || 30;
  const contentWidth = width - (padding.left + yAxisWidth + padding.right);
  const contentHeight = height - (padding.top + xAxisHeight + padding.bottom);
  const yDomainSize = Math.abs(yDomain[1] - yDomain[0]);
  const xDomainSize = Math.abs(xDomain[1] - xDomain[0]);

  const xTicksWithinDomain = xTicks.filter(getIsWithinDomain(xDomain));
  const yTicksWithinDomain = yTicks.filter(getIsWithinDomain(yDomain));

  const mapDomainToCanvas = ({ x, y }: SkPoint): SkPoint => {
    return {
      x: (contentWidth / xDomainSize) * (x - xDomain[0]),
      y: contentHeight - (contentHeight / yDomainSize) * (y - yDomain[0]),
    };
  };

  // const mapCanvasToDomainX = (canvasX: number): number => {
  //   return (canvasX / contentWidth) * (xDomain[1] - xDomain[0]);
  // };

  const dataSeries = extractProps(children);

  const paths = dataSeries.map(({ data, color, strokeWidth }) => {
    const path = buildPath(data, mapDomainToCanvas);
    return (
      <Path
        path={path}
        color={color}
        strokeWidth={strokeWidth}
        style="stroke"
        strokeCap="round"
        strokeJoin="round"
      />
    );
  });

  const indicatorX = useSharedValue(0);
  const indicatorScale = useSharedValue(1);

  const pan = Gesture.Pan()
    .onStart(() => {
      indicatorScale.value = withTiming(1.2, { duration: 200 });
    })
    .onChange(e => {
      indicatorX.value += e.changeX;
      const canvasX = indicatorX.value + 15;
      const domainX = (canvasX / contentWidth) * (xDomain[1] - xDomain[0]);
      let domainY = 0;
      dataSeries[0]?.data.every((point, i, arr) => {
        if (domainX === point.x) {
          domainY = point.y;
          return false;
        }
        if (domainX > point.x && !!arr[i + 1] && domainX < arr[i + 1]!.x) {
          const next = arr[i + 1]!;
          const a = (point.y - next.y) / (point.x - next.x);
          const b = point.y - a * point.x;
          domainY = a * domainX + b;
          return false;
        }

        return true;
      });

      if (onIndicatorChange) {
        runOnJS(onIndicatorChange)({ x: domainY, y: domainX });
      }
    })
    .onEnd(() => {
      indicatorScale.value = withTiming(1, { duration: 200 });
    });

  const indicatorDotStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: indicatorX.value },
      { scale: indicatorScale.value },
    ],
  }));

  const indicatorLineStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  const [showIndicator, setShowIndicator] = useState(false);
  const tap = Gesture.Tap().onStart(() => {
    runOnJS(setShowIndicator)(!showIndicator);
  });

  return (
    <>
      <GestureDetector gesture={tap}>
        <ChartContainer
          width={width}
          height={height}
          backgroundColor={backgroundColor}
          padding={padding}>
          <Group transform={[{ translateX: yAxisWidth }]}>
            <Gridlines
              {...gridlinesConfig}
              xTicks={xTicks}
              yTicks={yTicks}
              xDomain={xDomain}
              yDomain={yDomain}
              mapDomainToCanvas={mapDomainToCanvas}
            />
            <Group clip={rect(0, 0, contentWidth, contentHeight)}>
              {paths}
            </Group>
          </Group>
          <YAxis
            ticks={yTicksWithinDomain}
            width={yAxisWidth}
            height={contentHeight}
            font={font}
            {...yAxis}
            mapDomainToCanvas={mapDomainToCanvas}
          />
          <Group
            transform={[
              { translateX: yAxisWidth },
              {
                translateY: contentHeight,
              },
            ]}>
            <XAxis
              ticks={xTicksWithinDomain}
              width={contentWidth}
              height={xAxisHeight}
              font={font}
              {...xAxis}
              mapDomainToCanvas={mapDomainToCanvas}
            />
          </Group>
        </ChartContainer>
      </GestureDetector>
      {showIndicator ? (
        <GestureDetector gesture={pan}>
          <View style={[style.container, { left: padding.left + yAxisWidth }]}>
            <Animated.View style={[style.indicator, indicatorDotStyles]} />
            <Animated.View style={[style.line, indicatorLineStyles]} />
          </View>
        </GestureDetector>
      ) : null}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  indicator: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
  },
  line: {
    position: 'absolute',
    left: 14,
    width: 2,
    height: 300 - 30,
    backgroundColor: 'red',
  },
});

export default LineChart;
