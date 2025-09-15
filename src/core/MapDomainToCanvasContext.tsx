import { createContext, useContext } from 'react';

import type { SkPoint } from '@shopify/react-native-skia';

type MappingFn = (point: SkPoint) => SkPoint;

export const MapDomainToCanvasContext = createContext<MappingFn | undefined>(
  undefined,
);

export const useMapDomainToCanvas = () => {
  const value = useContext(MapDomainToCanvasContext);

  if (!value) {
    throw new Error(
      'useMapDomainToCanvas must be used within a MapDomainToCanvasProvider',
    );
  }

  return value;
};
