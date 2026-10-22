import { derivePasswordBits } from './derive-password-bits';
import { PASSWORD_HASH_ITERATIONS, PASSWORD_SALT_BYTES } from './password-hash-format';
import { serializePasswordHash } from './serialize-password-hash';

export const hashPassword = async (
  password: string,
  iterations = PASSWORD_HASH_ITERATIONS,
): Promise<string> => {
  const salt = crypto.getRandomValues(new Uint8Array(PASSWORD_SALT_BYTES));
  const hash = await derivePasswordBits({ password, salt, iterations });
  return serializePasswordHash({ iterations, salt, hash });
};
