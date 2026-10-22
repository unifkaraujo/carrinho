import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { userTable } from '../../auth/data/user-table';

export const categoriesTable = sqliteTable(
  'categories',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [uniqueIndex('categories_user_name_idx').on(table.userId, table.name)],
);
