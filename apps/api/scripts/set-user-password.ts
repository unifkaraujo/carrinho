import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { hashPassword } from '../src/features/auth/domain/hash-password';

const CREDENTIAL_PROVIDER = 'credential';
const PASSWORD_ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';
const PASSWORD_LENGTH = 16;

const readOptions = () =>
  parseArgs({
    options: {
      email: { type: 'string' },
      remote: { type: 'boolean', default: false },
    },
  }).values;

const generatePassword = (): string =>
  Array.from(
    crypto.getRandomValues(new Uint8Array(PASSWORD_LENGTH)),
    (byte) => PASSWORD_ALPHABET[byte % PASSWORD_ALPHABET.length],
  ).join('');

const quote = (value: string | number): string => `'${String(value).replace(/'/g, "''")}'`;

const buildSql = (email: string, passwordHash: string, now: number): string => `
DELETE FROM account WHERE provider_id = ${quote(CREDENTIAL_PROVIDER)}
  AND user_id = (SELECT id FROM "user" WHERE email = ${quote(email)});
INSERT INTO account (id, user_id, account_id, provider_id, password, created_at, updated_at)
SELECT ${quote(crypto.randomUUID())}, id, id, ${quote(CREDENTIAL_PROVIDER)}, ${quote(passwordHash)}, ${now}, ${now}
FROM "user" WHERE email = ${quote(email)};
`;

const executeSql = (sql: string, remote: boolean): void => {
  const path = join(mkdtempSync(join(tmpdir(), 'meu-mercado-')), 'password.sql');
  writeFileSync(path, sql);
  const target = remote ? '--remote' : '--local';
  execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', target, '--file', path], {
    stdio: 'inherit',
    shell: true,
  });
};

const main = async (): Promise<void> => {
  const { email, remote } = readOptions();
  if (!email) throw new Error('Informe --email de um usuário já cadastrado');
  const password = generatePassword();
  executeSql(buildSql(email, await hashPassword(password), Date.now()), remote);
  console.log(`\nSenha definida para ${email}:\n${password}\n`);
};

await main();
