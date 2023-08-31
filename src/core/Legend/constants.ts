import type { LegendConfig, LegendMarker } from './types';

export const defaultLegendConfig: Required<LegendConfig> = {
  gap: 0,
  position: 'right',
  width: 0,
  height: 0,
  textColor: 'black',
};

export const defaultMarkerConfig: Required<LegendMarker> = {
  radius: 0,
  size: 20,
};
