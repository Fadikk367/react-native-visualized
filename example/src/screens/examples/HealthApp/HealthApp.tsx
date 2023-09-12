import React, { useState } from 'react';
import { Image, Text, View, useWindowDimensions } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';
import { fonts } from '@/theme/fonts';

import Card from './components/Card';
import { useHealthData } from './useHealthData';
import { formatTimeLabel } from './utils';

const HealthApp = () => {
  const [date, setDate] = useState(new Date());
  const { heartRate, activity, sleep } = useHealthData(date);
  const { width } = useWindowDimensions();

  const activityCompletion =
    activity.reduce((acc, curr) => acc + curr.value / curr.full, 0) / 3;

  return (
    <ScreenContainer>
      <View
        style={{
          backgroundColor: '#d36e6e',
          paddingTop: 60,
          padding: 20,
          flexDirection: 'row',
        }}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/240' }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#ffffff',
          }}
        />
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>John Doe</Text>
          <Text style={{ fontSize: 14, fontWeight: '500' }}>Cracow</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 4,
          backgroundColor: '#ffffff',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          accessibilityLabel="Previous day"
          onPress={() =>
            setDate(prev => {
              const nextDay = new Date(prev);
              nextDay.setDate(prev.getDate() - 1);
              return nextDay;
            })
          }>
          <MaterialCommunityIcons name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 16 }}>{date.toLocaleDateString()}</Text>
        <TouchableOpacity
          testID="next-day"
          onPress={() => {
            setDate(prev => {
              const nextDay = new Date(prev);
              nextDay.setDate(prev.getDate() + 1);
              return nextDay;
            });
          }}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Card title="Heart Rate [ bpm ]">
        <Chart.AreaChart
          animated
          data={[
            {
              points: heartRate,
              color: '#c85151',
              label: 'HR',
              stroke: 4,
              opacity: 0.8,
              fill: {
                colors: ['#ffffff', '#d86c6c'],
                positions: [0.3, 0.9],
                start: { x: 0, y: 160 },
                end: { x: 0, y: 0 },
              },
            },
          ]}
          xTicks={[0, 6, 12, 18, 24]}
          yTicks={[40, 80, 120, 160]}
          xDomain={[0, 24]}
          yDomain={[20, 180]}
          width={width - 40}
          height={140}
          font={fonts.OpenSans}
          padding={{ left: 10, right: 20 }}
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
          fontSize={10}
        />
      </Card>
      <Card title="Activity">
        <Chart.ProgressRing
          data={activity}
          width={width - 40}
          height={140}
          ringWidth={12}
          padding={{ top: 8 }}
          centerLabel={{
            fontSize: 14,
            text: `${(activityCompletion * 100).toFixed(0)}%`,
          }}
          ringsSpacing={2}
          legend={{
            position: 'right',
            height: 80,
            width: 150,
            gap: 0,
            fontSize: 12,
            marker: { size: 16, radius: 6 },
            formatLabel: (value, extras) => {
              // FIXME: Deliberate casting due to typing bug in react-native-visualized
              const castedExtras = extras! as { value: number; full: number };
              return `${value} (${castedExtras.value.toFixed(
                0,
              )}/${castedExtras.full.toFixed(0)})`;
            },
          }}
          font={fonts.OpenSans}
          fontSize={12}
        />
      </Card>
      <Card title="Sleep [ h ]">
        <Chart.Bar
          animated
          data={sleep}
          yTicks={[2, 4, 6, 8, 10]}
          yDomain={[0, 12]}
          width={width - 40}
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
    </ScreenContainer>
  );
};

export default HealthApp;
