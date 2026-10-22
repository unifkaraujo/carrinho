import { describe, expect, it } from 'vitest';
import { buildCategory } from '../../categories/testing/build-category';
import { createInMemoryCategoriesRepository } from '../../categories/testing/in-memory-categories-repository';
import type { Item } from '../domain/item';
import type { ItemPatch } from '../domain/item-patch';
import { buildItem } from '../testing/build-item';
import { createInMemoryItemsRepository } from '../testing/in-memory-items-repository';
import { updateItem } from './update-item';

const NOW = new Date('2026-10-22T12:00:00Z');

const setup = (items: Item[] = [buildItem()]) => ({
  items: createInMemoryItemsRepository(items),
  categories: createInMemoryCategoriesRepository([buildCategory()]),
});

const update = (deps: ReturnType<typeof setup>, patch: ItemPatch, itemId = 'item-1') =>
  updateItem(deps, { userId: 'user-1', itemId, patch }, NOW);

describe('updateItem', () => {
  it('marca como comprado registrando a data', async () => {
    const result = await update(setup(), { status: 'bought' });
    expect(result).toMatchObject({ item: { status: 'bought', boughtAt: NOW, updatedAt: NOW } });
  });

  it('volta para pendente limpando a data de compra', async () => {
    const deps = setup([buildItem({ status: 'bought', boughtAt: NOW })]);
    expect(await update(deps, { status: 'pending' })).toMatchObject({
      item: { status: 'pending', boughtAt: null },
    });
  });

  it('atualiza quantidade, unidade e categoria', async () => {
    const result = await update(setup(), { quantity: 2, unit: 'dúzia', categoryId: 'category-1' });
    expect(result).toMatchObject({
      item: { quantity: 2, unit: 'dúzia', categoryId: 'category-1' },
    });
  });

  it('remove a unidade e a categoria com null', async () => {
    const deps = setup([buildItem({ unit: 'kg', categoryId: 'category-1' })]);
    expect(await update(deps, { unit: null, categoryId: null })).toMatchObject({
      item: { unit: null, categoryId: null },
    });
  });

  it('renomeia recalculando o nome normalizado', async () => {
    expect(await update(setup(), { name: '  Pães  ' })).toMatchObject({
      item: { name: 'Pães', normalizedName: 'pao' },
    });
  });

  it('recusa renomear para o nome de outro item', async () => {
    const deps = setup([
      buildItem(),
      buildItem({ id: 'item-2', name: 'Leite', normalizedName: 'leite' }),
    ]);
    expect(await update(deps, { name: 'ovo' }, 'item-2')).toEqual({ error: 'name_conflict' });
  });

  it('recusa categoria de outro usuário ou inexistente', async () => {
    expect(await update(setup(), { categoryId: 'nao-existe' })).toEqual({
      error: 'category_not_found',
    });
  });

  it('retorna erro para item de outro usuário', async () => {
    const deps = setup([buildItem({ userId: 'user-2' })]);
    expect(await update(deps, { status: 'bought' })).toEqual({ error: 'item_not_found' });
  });
});
