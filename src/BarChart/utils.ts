export const getIsWithinDomain =
  (domain: [number, number]) => (value: number) => {
    return domain[0] <= value && value <= domain[1];
  };
