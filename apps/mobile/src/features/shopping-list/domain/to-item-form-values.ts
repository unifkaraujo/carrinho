import type { Item } from './item';
import type { ItemFormValues } from './item-form-schema';

export const toItemFormValues = (item: Item): ItemFormValues => ({
  name: item.name,
  quantity: String(item.quantity).replace('.', ','),
  unit: item.unit ?? '',
});
