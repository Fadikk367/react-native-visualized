export const getIsWithinDomain =
  (domain: [number, number]) => (value: number) => {
    return domain[0] <= value && value <= domain[1];
  };

export function ensureDefaults<T extends Record<string, number | string | any>>(
  obj: T,
  defaults: Required<T>,
): Required<T> {
  let result: Partial<T> = {};
  for (const key in defaults) {
    result[key] = obj[key] === undefined ? defaults[key] : obj[key];
  }

  return result as Required<T>;
}
