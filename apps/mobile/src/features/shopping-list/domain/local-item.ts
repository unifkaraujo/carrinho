import type { Item } from './item';

export const LOCAL_ITEM_ID_PREFIX = 'local-';

export const isLocalItem = (item: Item): boolean => item.id.startsWith(LOCAL_ITEM_ID_PREFIX);
