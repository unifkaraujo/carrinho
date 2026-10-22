import { formatItemAmount } from '@meu-mercado/shared';
import type { Item } from '../../items/domain/item';
import type { ItemUpsertOutcome } from '../../items/domain/item-upsert-outcome';
import type { AddItemResult } from '../../items/use-cases/add-item';

const MESSAGES: Record<ItemUpsertOutcome, (item: Item) => string> = {
  created: (item) => `Adicionado: ${item.name}`,
  updated: (item) => `Atualizado: ${item.name} (${formatItemAmount(item)})`,
  reactivated: (item) => `De volta à lista: ${item.name}`,
  unchanged: (item) => `Já está na lista: ${item.name}`,
};

export const buildCaptureMessage = ({ item, outcome }: AddItemResult): string =>
  MESSAGES[outcome](item);
