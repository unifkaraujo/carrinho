export interface TakenToken<T> {
  value: T | null;
  rest: string[];
}

export const takeLeadingToken = <T>(
  tokens: string[],
  parse: (token: string) => T | null,
): TakenToken<T> => {
  const [first, ...rest] = tokens;
  const value = first === undefined ? null : parse(first);
  return value === null ? { value: null, rest: tokens } : { value, rest };
};
