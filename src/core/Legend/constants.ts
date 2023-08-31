import type { LegendConfig, LegendMarker } from './types';

export const defaultLegendConfig: Required<Omit<LegendConfig, 'marker'>> = {
  gap: 0,
  position: 'right',
  width: 0,
  height: 0,
  fontColor: 'black',
  fontSize: 12,
  items: [],
};

export const defaultMarkerConfig: Required<LegendMarker> = {
  radius: 0,
  size: 20,
};
