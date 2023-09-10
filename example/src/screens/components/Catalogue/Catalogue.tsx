import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import Flex from '@/components/Flex';
import ScreenContainer from '@/components/ScreenContainer';
import { useTheme } from '@/hooks/useTheme';

import AreaChartIcon from '../../../../assets/svg/charts/area.svg';
import BarChartIcon from '../../../../assets/svg/charts/bar.svg';
import LineChartIcon from '../../../../assets/svg/charts/line.svg';
import PieChartIcon from '../../../../assets/svg/charts/pie.svg';
import ProgressRingIcon from '../../../../assets/svg/charts/progress-rings.svg';
import RadarChartIcon from '../../../../assets/svg/charts/radar.svg';
import ScatterIcon from '../../../../assets/svg/charts/scatter.svg';
import type { CatalogueProps, ComponentsStackScreens } from './types';

const charts = [
  { label: 'Line Chart', screen: 'LineChart', Icon: LineChartIcon },
  { label: 'Area Chart', screen: 'AreaChart', Icon: AreaChartIcon },
  { label: 'Bar Chart', screen: 'BarChart', Icon: BarChartIcon },
  { label: 'Scatter Chart', screen: 'Scatter', Icon: ScatterIcon },
  { label: 'Pie Chart', screen: 'PieChart', Icon: PieChartIcon },
  { label: 'Progress Rings', screen: 'ProgressRing', Icon: ProgressRingIcon },
  { label: 'Radar Chart', screen: 'RadarChart', Icon: RadarChartIcon },
] as const;

const GRID_PADDING = 10;
const CARD_MARGIN = 10;
const NUMBER_OF_COLUMNS = 2;
const ICON_SIZE = 80;

const Catalogue = ({ navigation }: CatalogueProps) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const getNavigateTo = (screen: ComponentsStackScreens) => () => {
    navigation.navigate('Components', { screen });
  };

  const cardWidth =
    (width - (2 * GRID_PADDING + 2 * NUMBER_OF_COLUMNS * CARD_MARGIN)) /
    NUMBER_OF_COLUMNS;

  return (
    <ScreenContainer>
      <View style={styles.grid}>
        {charts.map(({ label, screen, Icon }) => (
          <TouchableOpacity
            key={label}
            activeOpacity={0.3}
            onPress={getNavigateTo(screen)}
            containerStyle={[
              styles.cardContainer,
              {
                width: cardWidth,
                backgroundColor: colors.surface,
                margin: CARD_MARGIN,
              },
            ]}>
            <Flex alignItems="center" justifyContent="center" gap={16}>
              <Icon width={ICON_SIZE} height={ICON_SIZE} />
              <Text style={styles.cardText}>{label}</Text>
            </Flex>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: GRID_PADDING,
  },
  cardContainer: {
    padding: 20,
    borderRadius: 16,
    // shadows
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontWeight: '500',
  },
});

export default Catalogue;
