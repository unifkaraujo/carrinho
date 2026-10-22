import { useItems } from './use-items';

export const useItem = (id: string) => {
  const items = useItems();
  return { ...items, data: items.data?.find((item) => item.id === id) ?? null };
};
