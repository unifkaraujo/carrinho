import { describe, expect, it } from 'vitest';
import { hashPassword } from './hash-password';
import { verifyPassword } from './verify-password';

describe('password hashing', () => {
  it('verifica a senha correta', async () => {
    const hash = await hashPassword('senha-forte-123');
    expect(await verifyPassword({ hash, password: 'senha-forte-123' })).toBe(true);
  });

  it('rejeita senha errada', async () => {
    const hash = await hashPassword('senha-forte-123');
    expect(await verifyPassword({ hash, password: 'outra-senha' })).toBe(false);
  });

  it('gera hashes diferentes para a mesma senha', async () => {
    expect(await hashPassword('igual')).not.toBe(await hashPassword('igual'));
  });

  it('rejeita hash em formato desconhecido', async () => {
    expect(await verifyPassword({ hash: 'scrypt:abc', password: 'x' })).toBe(false);
  });
});
