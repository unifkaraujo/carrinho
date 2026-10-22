import { normalizeItemName, parseCaptureText, type ParsedCapture } from '@meu-mercado/shared';
import type { Item } from '../../shopping-list/domain/item';
import type { CaptureVariables } from './capture-variables';

const DEFAULT_QUANTITY = 1;

const mergeCapture = (existing: Item, parsed: ParsedCapture, now: string): Item => ({
  ...existing,
  ...(parsed.quantity === null ? {} : { quantity: parsed.quantity, unit: parsed.unit }),
  status: 'pending',
  boughtAt: null,
  updatedAt: now,
});

const createLocalItem = (
  parsed: ParsedCapture,
  { localId, capturedAt }: CaptureVariables,
): Item => ({
  id: localId,
  name: parsed.name,
  normalizedName: normalizeItemName(parsed.name),
  quantity: parsed.quantity ?? DEFAULT_QUANTITY,
  unit: parsed.quantity === null ? null : parsed.unit,
  categoryId: null,
  status: 'pending',
  boughtAt: null,
  createdAt: capturedAt,
  updatedAt: capturedAt,
});

export const applyCaptureToList = (items: Item[], variables: CaptureVariables): Item[] => {
  const parsed = parseCaptureText(variables.text);
  if (!parsed) return items;
  const normalizedName = normalizeItemName(parsed.name);
  const existing = items.find((item) => item.normalizedName === normalizedName);
  if (!existing) return [...items, createLocalItem(parsed, variables)];
  return items.map((item) =>
    item === existing ? mergeCapture(item, parsed, variables.capturedAt) : item,
  );
};
