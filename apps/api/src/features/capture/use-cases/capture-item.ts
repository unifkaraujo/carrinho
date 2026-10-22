import { parseCaptureText } from '@meu-mercado/shared';
import type { ItemsRepository } from '../../items/domain/items-repository';
import { addItem, type AddItemResult } from '../../items/use-cases/add-item';

interface CaptureItemInput {
  userId: string;
  text: string;
}

export const captureItem = async (
  items: ItemsRepository,
  { userId, text }: CaptureItemInput,
  now = new Date(),
): Promise<AddItemResult | null> => {
  const parsed = parseCaptureText(text);
  return parsed ? addItem(items, { userId, ...parsed }, now) : null;
};
