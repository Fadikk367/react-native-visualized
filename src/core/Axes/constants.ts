export const defaultLineStyles = {
  strokeWidth: 1,
  color: 'black',
};

export const defaultTickStyles = {
  size: 3,
  width: 1,
  color: 'black',
};

export const defaultLabelStyles = {
  rotation: 0,
  color: 'black',
  fontSize: 18,
};

export const defaultFormatLabel = (tick: number): string => {
  return tick.toFixed(0);
};
