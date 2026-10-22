import { index, integer, real, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { userTable } from '../../auth/data/user-table';
import { categoriesTable } from '../../categories/data/categories-table';
import { ITEM_STATUSES } from '../domain/item';

export const itemsTable = sqliteTable(
  'items',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    normalizedName: text('normalized_name').notNull(),
    quantity: real('quantity').notNull(),
    unit: text('unit'),
    categoryId: text('category_id').references(() => categoriesTable.id, {
      onDelete: 'set null',
    }),
    status: text('status', { enum: ITEM_STATUSES }).notNull(),
    boughtAt: integer('bought_at', { mode: 'timestamp_ms' }),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [
    uniqueIndex('items_user_normalized_name_idx').on(table.userId, table.normalizedName),
    index('items_user_status_idx').on(table.userId, table.status),
  ],
);
