import { useMemo } from 'react';
import { useCategories } from '../../categories/hooks/use-categories';
import { buildListSections } from '../domain/build-list-sections';
import { useItems } from './use-items';

export const useListSections = () => {
  const items = useItems();
  const categories = useCategories();
  const sections = useMemo(
    () => buildListSections(items.data ?? [], categories.data ?? []),
    [items.data, categories.data],
  );
  const pendingCount = (items.data ?? []).filter((item) => item.status === 'pending').length;
  const refetch = () => {
    items.refetch();
    categories.refetch();
  };

  return { items, sections, pendingCount, refetch };
};
