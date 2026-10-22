import type { QueryClient } from '@tanstack/react-query';
import { countPendingItems } from '../features/quick-capture/widget/count-pending-items';
import { updateQuickCaptureWidget } from '../features/quick-capture/widget/update-quick-capture-widget';
import { ITEMS_QUERY_KEY } from '../features/shopping-list/data/items-query-key';
import type { Item } from '../features/shopping-list/domain/item';

const isItemsQuery = (queryKey: readonly unknown[]) => queryKey[0] === ITEMS_QUERY_KEY[0];

export const syncWidgetWithItems = (queryClient: QueryClient) => {
  let lastCount: number | null = null;
  return queryClient.getQueryCache().subscribe(({ type, query }) => {
    if (type !== 'updated' || !isItemsQuery(query.queryKey)) return;
    const items = query.state.data as Item[] | undefined;
    if (!items) return;
    const count = countPendingItems(items);
    if (count === lastCount) return;
    lastCount = count;
    updateQuickCaptureWidget(count);
  });
};
