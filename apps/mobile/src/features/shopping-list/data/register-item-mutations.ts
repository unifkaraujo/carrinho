import type { QueryClient } from '@tanstack/react-query';
import { optimisticHandlers } from '../../../shared/query/optimistic-handlers';
import type { Item } from '../domain/item';
import {
  removeBoughtFromList,
  removeItemFromList,
  updateItemInList,
} from '../domain/items-list-updates';
import { deleteBoughtItems, deleteItem, patchItem } from './items-api';
import { ITEM_MUTATION_KEYS, ITEM_MUTATION_SCOPE } from './item-mutation-keys';
import { ITEMS_QUERY_KEY } from './items-query-key';
import type { UpdateItemVariables } from './update-item-variables';

const nowIso = () => new Date().toISOString();

export const registerItemMutations = (queryClient: QueryClient) => {
  queryClient.setMutationDefaults(ITEM_MUTATION_KEYS.update, {
    scope: ITEM_MUTATION_SCOPE,
    mutationFn: ({ id, patch }: UpdateItemVariables) => patchItem(id, patch),
    ...optimisticHandlers<Item[], UpdateItemVariables>(queryClient, ITEMS_QUERY_KEY, (items, v) =>
      updateItemInList(items, v, nowIso()),
    ),
  });
  queryClient.setMutationDefaults(ITEM_MUTATION_KEYS.remove, {
    scope: ITEM_MUTATION_SCOPE,
    mutationFn: (id: string) => deleteItem(id),
    ...optimisticHandlers<Item[], string>(queryClient, ITEMS_QUERY_KEY, removeItemFromList),
  });
  queryClient.setMutationDefaults(ITEM_MUTATION_KEYS.clearBought, {
    scope: ITEM_MUTATION_SCOPE,
    mutationFn: () => deleteBoughtItems(),
    ...optimisticHandlers<Item[], undefined>(queryClient, ITEMS_QUERY_KEY, removeBoughtFromList),
  });
};
