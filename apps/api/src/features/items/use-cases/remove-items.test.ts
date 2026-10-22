import { describe, expect, it } from 'vitest';
import { buildItem } from '../testing/build-item';
import { createInMemoryItemsRepository } from '../testing/in-memory-items-repository';
import { clearBoughtItems } from './clear-bought-items';
import { removeItem } from './remove-item';

describe('removeItem', () => {
  it('remove item do usuário', async () => {
    const items = createInMemoryItemsRepository([buildItem()]);
    expect(await removeItem(items, 'user-1', 'item-1')).toBe(true);
    expect(await items.findById('user-1', 'item-1')).toBeNull();
  });

  it('não remove item de outro usuário', async () => {
    const items = createInMemoryItemsRepository([buildItem({ userId: 'user-2' })]);
    expect(await removeItem(items, 'user-1', 'item-1')).toBe(false);
  });
});

describe('clearBoughtItems', () => {
  it('remove apenas os comprados do usuário', async () => {
    const items = createInMemoryItemsRepository([
      buildItem({ id: 'a', status: 'bought' }),
      buildItem({ id: 'b', status: 'pending' }),
      buildItem({ id: 'c', status: 'bought', userId: 'user-2' }),
    ]);
    expect(await clearBoughtItems(items, 'user-1')).toBe(1);
    expect((await items.listByUser('user-1', null)).map((item) => item.id)).toEqual(['b']);
    expect(await items.findById('user-2', 'c')).not.toBeNull();
  });
});
