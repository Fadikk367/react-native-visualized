export function ensureDefaults<T extends Record<string, number | string | any>>(
  obj: T | undefined,
  defaults: Required<T>,
): Required<T> {
  if (!obj) return { ...defaults };

  let result: Partial<T> = {};
  for (const key in defaults) {
    result[key] = obj[key] === undefined ? defaults[key] : obj[key];
  }

  return result as Required<T>;
}
