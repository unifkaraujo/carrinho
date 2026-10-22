import { describe, expect, it } from 'vitest';
import { applyItemPatch } from './apply-item-patch';
import type { Item } from './item';

const NOW = '2026-10-22T12:00:00.000Z';

const pending: Item = {
  id: '1',
  name: 'Ovos',
  normalizedName: 'ovo',
  quantity: 1,
  unit: null,
  categoryId: null,
  status: 'pending',
  boughtAt: null,
  createdAt: '2026-10-22T10:00:00.000Z',
  updatedAt: '2026-10-22T10:00:00.000Z',
};

describe('applyItemPatch', () => {
  it('marca como comprado com data', () => {
    expect(applyItemPatch(pending, { status: 'bought' }, NOW)).toMatchObject({
      status: 'bought',
      boughtAt: NOW,
      updatedAt: NOW,
    });
  });

  it('desmarca limpando a data', () => {
    const bought = { ...pending, status: 'bought' as const, boughtAt: NOW };
    expect(applyItemPatch(bought, { status: 'pending' }, NOW).boughtAt).toBeNull();
  });

  it('renomeia recalculando o nome normalizado', () => {
    expect(applyItemPatch(pending, { name: ' Pães ' }, NOW)).toMatchObject({
      name: 'Pães',
      normalizedName: 'pao',
    });
  });
});
