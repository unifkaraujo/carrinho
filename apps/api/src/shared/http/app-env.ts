import type { Auth } from '../../features/auth/data/create-auth';
import type { Database } from '../db/database';

export interface AppBindings {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
}

export interface AppEnv {
  Bindings: AppBindings;
  Variables: {
    db: Database;
    auth: Auth;
    userId: string;
  };
}
