export function getRandomEnumValue<T extends Record<string, string | number>>(
  enumObj: T,
): T[keyof T] {
  const values = Object.values(enumObj) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
