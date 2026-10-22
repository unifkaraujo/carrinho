import { derivePasswordBits } from './derive-password-bits';
import { parsePasswordHash } from './serialize-password-hash';

const constantTimeEqual = (a: Uint8Array, b: Uint8Array): boolean =>
  a.length === b.length &&
  a.reduce((diff, byte, index) => diff | (byte ^ (b[index] ?? 0)), 0) === 0;

interface VerifyPasswordParams {
  hash: string;
  password: string;
}

export const verifyPassword = async ({
  hash,
  password,
}: VerifyPasswordParams): Promise<boolean> => {
  const parts = parsePasswordHash(hash);
  if (!parts) return false;
  const candidate = await derivePasswordBits({ password, ...parts });
  return constantTimeEqual(candidate, parts.hash);
};
