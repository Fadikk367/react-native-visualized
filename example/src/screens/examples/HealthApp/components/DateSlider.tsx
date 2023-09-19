import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IconButton from './IconButton';

interface DateSliderProps {
  date: Date;
  onPrevious(): void;
  onNext(): void;
}

const DateSlider = ({ date, onPrevious, onNext }: DateSliderProps) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="chevron-left"
        accessibilityLabel="Previous day"
        onPress={onPrevious}
      />
      <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
      <IconButton
        icon="chevron-right"
        accessibilityLabel="Next day"
        onPress={onNext}
      />
    </View>
  );
};

export default DateSlider;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },
});
