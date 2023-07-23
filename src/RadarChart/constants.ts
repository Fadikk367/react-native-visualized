import type { LineConfig, PolygonConfig } from './types';

export const gridLinesConfigDefaults: Readonly<LineConfig> = {
  color: '#000000',
  lineWidth: 1,
  opacity: 0.3,
};

export const axesConfigDefaults: Readonly<LineConfig> = {
  color: '#000000',
  lineWidth: 1,
  opacity: 1,
};

export const defaultPolygonsConfig: Readonly<PolygonConfig> = {
  fillOpacity: 0.3,
  lineWidth: 3,
  outlineOpacity: 0.8,
};
