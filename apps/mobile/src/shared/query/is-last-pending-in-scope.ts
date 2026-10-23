import type { QueryClient } from '@tanstack/react-query';

export const isLastPendingInScope = (queryClient: QueryClient, scopeId: string): boolean =>
  queryClient.isMutating({ predicate: (mutation) => mutation.options.scope?.id === scopeId }) <= 1;
