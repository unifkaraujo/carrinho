import { describe, expect, it } from 'vitest';
import type { Item } from '../../shopping-list/domain/item';
import { applyCaptureToList } from './apply-capture-to-list';

const AT = '2026-10-22T12:00:00.000Z';

const existing: Item = {
  id: 'server-1',
  name: 'Ovos',
  normalizedName: 'ovo',
  quantity: 12,
  unit: null,
  categoryId: 'horti',
  status: 'bought',
  boughtAt: '2026-10-21T12:00:00.000Z',
  createdAt: '2026-10-20T12:00:00.000Z',
  updatedAt: '2026-10-21T12:00:00.000Z',
};

const capture = (text: string) => ({ text, localId: 'local-1', capturedAt: AT });

describe('applyCaptureToList', () => {
  it('adiciona item local quando não existe', () => {
    const [item] = applyCaptureToList([], capture('2 dúzias de ovos'));
    expect(item).toMatchObject({
      id: 'local-1',
      name: 'ovos',
      normalizedName: 'ovo',
      quantity: 2,
      unit: 'dúzia',
      status: 'pending',
    });
  });

  it('reativa item existente mantendo quantidade e categoria quando não informada', () => {
    const [item] = applyCaptureToList([existing], capture('ovo'));
    expect(item).toMatchObject({
      id: 'server-1',
      status: 'pending',
      boughtAt: null,
      quantity: 12,
      categoryId: 'horti',
    });
  });

  it('atualiza a quantidade quando informada', () => {
    const [item] = applyCaptureToList([existing], capture('6 ovos'));
    expect(item).toMatchObject({ quantity: 6, unit: null });
  });

  it('ignora texto sem item', () => {
    expect(applyCaptureToList([existing], capture('adicionar'))).toEqual([existing]);
  });
});
