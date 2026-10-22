import { describe, expect, it } from 'vitest';
import { buildItem } from '../testing/build-item';
import { createInMemoryItemsRepository } from '../testing/in-memory-items-repository';
import { addItem } from './add-item';

const NOW = new Date('2026-10-22T12:00:00Z');
const draft = (name: string, quantity: number | null = null, unit: string | null = null) => ({
  userId: 'user-1',
  name,
  quantity,
  unit,
});

describe('addItem', () => {
  it('cria um item pendente com quantidade 1 quando não há quantidade', async () => {
    const result = await addItem(createInMemoryItemsRepository(), draft('Ovos'), NOW);
    expect(result.outcome).toBe('created');
    expect(result.item).toMatchObject({
      name: 'Ovos',
      normalizedName: 'ovo',
      quantity: 1,
      unit: null,
      status: 'pending',
      createdAt: NOW,
    });
  });

  it('cria com quantidade e unidade informadas', async () => {
    const result = await addItem(createInMemoryItemsRepository(), draft('ovos', 2, 'dúzia'), NOW);
    expect(result.item).toMatchObject({ quantity: 2, unit: 'dúzia' });
  });

  it('não altera item pendente quando não há nova quantidade', async () => {
    const existing = buildItem({ quantity: 12 });
    const result = await addItem(createInMemoryItemsRepository([existing]), draft('ovo'), NOW);
    expect(result).toEqual({ item: existing, outcome: 'unchanged' });
  });

  it('não altera item pendente com a mesma quantidade', async () => {
    const existing = buildItem({ quantity: 2, unit: 'dúzia' });
    const items = createInMemoryItemsRepository([existing]);
    const result = await addItem(items, draft('Ovos', 2, 'dúzia'), NOW);
    expect(result.outcome).toBe('unchanged');
  });

  it('atualiza a quantidade de item pendente quando mudou', async () => {
    const items = createInMemoryItemsRepository([buildItem({ quantity: 1 })]);
    const result = await addItem(items, draft('OVOS', 3), NOW);
    expect(result.outcome).toBe('updated');
    expect(result.item).toMatchObject({ quantity: 3, updatedAt: NOW });
    expect(await items.findByNormalizedName('user-1', 'ovo')).toMatchObject({ quantity: 3 });
  });

  it('reativa item comprado mantendo a quantidade anterior', async () => {
    const existing = buildItem({ status: 'bought', boughtAt: NOW, quantity: 12 });
    const result = await addItem(createInMemoryItemsRepository([existing]), draft('ovo'), NOW);
    expect(result.outcome).toBe('reactivated');
    expect(result.item).toMatchObject({ status: 'pending', boughtAt: null, quantity: 12 });
  });

  it('reativa item comprado com a nova quantidade', async () => {
    const existing = buildItem({ status: 'bought', boughtAt: NOW });
    const items = createInMemoryItemsRepository([existing]);
    const result = await addItem(items, draft('ovos', 6), NOW);
    expect(result.item).toMatchObject({ status: 'pending', quantity: 6 });
  });

  it('não considera itens de outro usuário como duplicata', async () => {
    const items = createInMemoryItemsRepository([buildItem({ userId: 'user-2' })]);
    const result = await addItem(items, draft('ovos'), NOW);
    expect(result.outcome).toBe('created');
  });
});
