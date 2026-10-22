import { fetchItems } from '../../shopping-list/data/items-api';
import { countPendingItems } from './count-pending-items';

export const fetchPendingCount = async (): Promise<number | null> => {
  try {
    return countPendingItems(await fetchItems());
  } catch {
    return null;
  }
};
