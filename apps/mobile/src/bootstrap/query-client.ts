import { QueryClient } from '@tanstack/react-query';
import { registerCaptureMutation } from '../features/quick-capture/data/register-capture-mutation';
import { registerItemMutations } from '../features/shopping-list/data/register-item-mutations';
import { PERSISTED_CACHE_MAX_AGE_MS } from '../shared/query/query-persister';
import { setupOnlineManager } from '../shared/query/setup-online-manager';

const MUTATION_RETRIES = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { gcTime: PERSISTED_CACHE_MAX_AGE_MS },
    mutations: { retry: MUTATION_RETRIES, gcTime: PERSISTED_CACHE_MAX_AGE_MS },
  },
});

setupOnlineManager();
registerItemMutations(queryClient);
registerCaptureMutation(queryClient);
