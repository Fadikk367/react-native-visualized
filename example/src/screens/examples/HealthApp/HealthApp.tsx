import React, { useState } from 'react';
import { Image, Text, View, useWindowDimensions } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Chart } from 'react-native-visualized';

import ScreenContainer from '@/components/ScreenContainer';
import { fonts } from '@/theme/fonts';

import ActivityRings from './components/ActivityRings';
import Card from './components/Card';
import HeartRateChart from './components/HeartRateChart';
import { useHealthData } from './useHealthData';

const HealthApp = () => {
  const [date, setDate] = useState(new Date());
  const { heartRate, activity, sleep } = useHealthData(date);
  const { width } = useWindowDimensions();
  // 40 For screen and Card margins and padding
  const chartWidth = width - 40;

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

      <ActivityRings data={activity} width={chartWidth} />
      <HeartRateChart data={heartRate} width={chartWidth} />
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
