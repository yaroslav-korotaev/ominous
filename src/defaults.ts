export function defaults<T>(value: Partial<T> | undefined, defaults: T): T {
  return { ...defaults, ...value };
}
