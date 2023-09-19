import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';

import ScreenContainer from '@/components/ScreenContainer';

import ActivityRings from './components/ActivityRings';
import DateSlider from './components/DateSlider';
import HeartRateChart from './components/HeartRateChart';
import SleepChart from './components/SleepChart';
import UserInfo from './components/UserInfo';
import { useHealthData } from './useHealthData';

const HealthApp = () => {
  const [date, setDate] = useState(new Date());
  const { heartRate, activity, sleep } = useHealthData(date);
  const { width } = useWindowDimensions();
  // 40 For screen and Card margins & paddings
  const chartWidth = width - 40;

  const changeDate = (daysOffset: number) =>
    setDate(prev => {
      const newDay = new Date(prev);
      newDay.setDate(prev.getDate() + daysOffset);
      return newDay;
    });

  return (
    <ScreenContainer>
      <UserInfo />
      <DateSlider
        date={date}
        onPrevious={() => changeDate(-1)}
        onNext={() => changeDate(1)}
      />
      <ActivityRings data={activity} width={chartWidth} />
      <HeartRateChart data={heartRate} width={chartWidth} />
      <SleepChart data={sleep} width={chartWidth} />
    </ScreenContainer>
  );
};

export default HealthApp;
