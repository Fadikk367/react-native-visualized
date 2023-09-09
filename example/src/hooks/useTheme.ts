import { useContext } from 'react';

import { ThemeContext } from '@/contexts/theme';

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) throw new Error('No ThemeContext available within the scope');

  return theme;
};
