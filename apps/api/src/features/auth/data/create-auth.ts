import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { bearer } from 'better-auth/plugins';
import type { Database } from '../../../shared/db/database';
import type { AppBindings } from '../../../shared/http/app-env';
import { hashPassword } from '../domain/hash-password';
import { verifyPassword } from '../domain/verify-password';
import { accountTable } from './account-table';
import { sessionTable } from './session-table';
import { userTable } from './user-table';
import { verificationTable } from './verification-table';

const AUTH_SCHEMA = {
  user: userTable,
  session: sessionTable,
  account: accountTable,
  verification: verificationTable,
};

const SESSION_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 90;

export const createAuth = (env: AppBindings, db: Database) =>
  betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    database: drizzleAdapter(db, { provider: 'sqlite', schema: AUTH_SCHEMA }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      password: { hash: hashPassword, verify: verifyPassword },
    },
    session: { expiresIn: SESSION_EXPIRES_IN_SECONDS },
    plugins: [bearer()],
    telemetry: { enabled: false },
  });

export type Auth = ReturnType<typeof createAuth>;
