import { useCallback, useRef } from 'react';

import type { BottomSheetModal } from '@gorhom/bottom-sheet';

export const useBottomSheet = () => {
  const ref = useRef<BottomSheetModal>(null);

  const open = useCallback(() => {
    ref.current?.present();
  }, []);

  const close = useCallback(() => {
    ref.current?.dismiss();
  }, []);

  return {
    ref,
    open,
    close,
  };
};
