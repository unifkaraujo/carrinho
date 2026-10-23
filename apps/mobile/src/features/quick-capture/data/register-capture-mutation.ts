import type { QueryClient } from '@tanstack/react-query';
import { optimisticHandlers } from '../../../shared/query/optimistic-handlers';
import { ITEM_MUTATION_SCOPE } from '../../shopping-list/data/item-mutation-keys';
import { ITEMS_QUERY_KEY } from '../../shopping-list/data/items-query-key';
import type { Item } from '../../shopping-list/domain/item';
import { applyCaptureToList } from '../domain/apply-capture-to-list';
import type { CaptureVariables } from '../domain/capture-variables';
import { postCapture } from './capture-api';
import { CAPTURE_MUTATION_KEY } from './capture-mutation-key';

export const registerCaptureMutation = (queryClient: QueryClient) =>
  queryClient.setMutationDefaults(CAPTURE_MUTATION_KEY, {
    scope: ITEM_MUTATION_SCOPE,
    mutationFn: ({ text }: CaptureVariables) => postCapture(text),
    ...optimisticHandlers<Item[], CaptureVariables>({
      queryClient,
      queryKey: ITEMS_QUERY_KEY,
      scopeId: ITEM_MUTATION_SCOPE.id,
      update: applyCaptureToList,
    }),
  });
