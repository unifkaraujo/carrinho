import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import type { ReactNode } from 'react';
import {
  PERSISTED_CACHE_BUSTER,
  PERSISTED_CACHE_MAX_AGE_MS,
  queryPersister,
} from '../shared/query/query-persister';
import { queryClient } from './query-client';

const PERSIST_OPTIONS = {
  persister: queryPersister,
  maxAge: PERSISTED_CACHE_MAX_AGE_MS,
  buster: PERSISTED_CACHE_BUSTER,
};

const resumeOfflineChanges = async () => {
  await queryClient.resumePausedMutations();
  await queryClient.invalidateQueries();
};

export const QueryProvider = ({ children }: { children: ReactNode }) => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={PERSIST_OPTIONS}
    onSuccess={resumeOfflineChanges}
  >
    {children}
  </PersistQueryClientProvider>
);
