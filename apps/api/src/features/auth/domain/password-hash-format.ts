export const PASSWORD_HASH_ALGORITHM = 'pbkdf2-sha256';
export const PASSWORD_HASH_ITERATIONS = 100_000;
export const PASSWORD_SALT_BYTES = 16;
export const PASSWORD_HASH_BITS = 256;

export interface PasswordHashParts {
  iterations: number;
  salt: Uint8Array;
  hash: Uint8Array;
}
