import { PASSWORD_HASH_BITS } from './password-hash-format';

interface DeriveParams {
  password: string;
  salt: Uint8Array;
  iterations: number;
}

export const derivePasswordBits = async ({
  password,
  salt,
  iterations,
}: DeriveParams): Promise<Uint8Array> => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    key,
    PASSWORD_HASH_BITS,
  );
  return new Uint8Array(bits);
};
