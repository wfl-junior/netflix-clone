export function match<
  V extends string | number | symbol,
  O extends Record<string | number | symbol, any>,
  D,
>(variable: V, options: O, defaultValue?: D): O[keyof O] | D {
  return options[variable as any] || defaultValue;
}
