import { defaultPadding } from '../constants';
import type { LegendConfig, LegendMarker } from './types';

export const defaultLegendConfig: Required<
  Omit<LegendConfig, 'marker' | 'layout' | 'formatLabel'>
> = {
  gap: 0,
  position: 'right',
  width: 0,
  height: 0,
  fontColor: 'black',
  fontSize: 12,
  padding: defaultPadding,
};

export const defaultMarkerConfig: Required<LegendMarker> = {
  radius: 0,
  gap: 10,
  size: 20,
};
