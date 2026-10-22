import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from './schema';

export type Database = DrizzleD1Database<typeof schema>;

export const createDatabase = (d1: D1Database): Database => drizzle(d1, { schema });
