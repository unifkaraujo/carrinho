import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { generateCaptureToken } from '../src/features/capture-tokens/domain/generate-capture-token';
import { hashCaptureToken } from '../src/features/capture-tokens/domain/hash-capture-token';

interface TokenSeed {
  email: string;
  label: string;
  tokenHash: string;
  now: number;
}

const readOptions = () =>
  parseArgs({
    options: {
      email: { type: 'string' },
      label: { type: 'string', default: 'HTTP Shortcuts' },
      remote: { type: 'boolean', default: false },
    },
  }).values;

const quote = (value: string | number): string => `'${String(value).replace(/'/g, "''")}'`;

const buildSql = ({ email, label, tokenHash, now }: TokenSeed): string => `
INSERT INTO capture_tokens (id, user_id, token_hash, label, created_at)
SELECT ${quote(crypto.randomUUID())}, id, ${quote(tokenHash)}, ${quote(label)}, ${now}
FROM "user" WHERE email = ${quote(email)};
`;

const writeTempSql = (sql: string): string => {
  const path = join(mkdtempSync(join(tmpdir(), 'meu-mercado-')), 'seed.sql');
  writeFileSync(path, sql);
  return path;
};

const executeSql = (sqlPath: string, remote: boolean): void => {
  const target = remote ? '--remote' : '--local';
  execFileSync('npx', ['wrangler', 'd1', 'execute', 'DB', target, '--file', sqlPath], {
    stdio: 'inherit',
    shell: true,
  });
};

const main = async (): Promise<void> => {
  const { email, label, remote } = readOptions();
  if (!email) throw new Error('Informe --email de um usuário já cadastrado');
  const token = generateCaptureToken();
  const tokenHash = await hashCaptureToken(token);
  executeSql(writeTempSql(buildSql({ email, label, tokenHash, now: Date.now() })), remote);
  console.log(
    `\nToken de captura (válido se o usuário existir; não será exibido de novo):\n${token}\n`,
  );
};

await main();
