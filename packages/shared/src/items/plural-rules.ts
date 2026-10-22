export const PLURAL_RULES: readonly (readonly [RegExp, string])[] = [
  [/oes$/, 'ao'],
  [/aes$/, 'ao'],
  [/ais$/, 'al'],
  [/eis$/, 'el'],
  [/ois$/, 'ol'],
  [/uis$/, 'ul'],
  [/zes$/, 'z'],
  [/([aeiou]r)es$/, '$1'],
  [/ns$/, 'm'],
  [/([aeiou])s$/, '$1'],
];
