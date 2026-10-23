import type { QueryClient, QueryKey } from '@tanstack/react-query';
import { isLastPendingInScope } from './is-last-pending-in-scope';

interface OptimisticOptions<TData, TVariables> {
  queryClient: QueryClient;
  queryKey: QueryKey;
  scopeId: string;
  update: (data: TData, variables: TVariables) => TData;
}

export const optimisticHandlers = <TData, TVariables>({
  queryClient,
  queryKey,
  scopeId,
  update,
}: OptimisticOptions<TData, TVariables>) => ({
  onMutate: async (variables: TVariables) => {
    await queryClient.cancelQueries({ queryKey });
    queryClient.setQueryData<TData>(queryKey, (data) =>
      data === undefined ? data : update(data, variables),
    );
  },
  onSettled: async () => {
    if (isLastPendingInScope(queryClient, scopeId))
      await queryClient.invalidateQueries({ queryKey });
  },
});
