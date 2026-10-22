import { PASSWORD_HASH_ALGORITHM, type PasswordHashParts } from './password-hash-format';

const SEPARATOR = '$';

const toBase64 = (bytes: Uint8Array): string => btoa(String.fromCharCode(...bytes));

const fromBase64 = (text: string): Uint8Array =>
  Uint8Array.from(atob(text), (char) => char.charCodeAt(0));

export const serializePasswordHash = ({ iterations, salt, hash }: PasswordHashParts): string =>
  [PASSWORD_HASH_ALGORITHM, iterations, toBase64(salt), toBase64(hash)].join(SEPARATOR);

export const parsePasswordHash = (serialized: string): PasswordHashParts | null => {
  const [algorithm, iterations, salt, hash] = serialized.split(SEPARATOR);
  if (algorithm !== PASSWORD_HASH_ALGORITHM || !iterations || !salt || !hash) return null;
  return { iterations: Number(iterations), salt: fromBase64(salt), hash: fromBase64(hash) };
};
