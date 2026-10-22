import type { QueryClient, QueryKey } from '@tanstack/react-query';

interface OptimisticContext<TData> {
  previous: TData | undefined;
}

export const optimisticHandlers = <TData, TVariables>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  update: (data: TData, variables: TVariables) => TData,
) => ({
  onMutate: async (variables: TVariables): Promise<OptimisticContext<TData>> => {
    await queryClient.cancelQueries({ queryKey });
    const previous = queryClient.getQueryData<TData>(queryKey);
    if (previous !== undefined) queryClient.setQueryData(queryKey, update(previous, variables));
    return { previous };
  },
  onError: (_error: unknown, _variables: TVariables, context?: OptimisticContext<TData>) => {
    if (context?.previous !== undefined) queryClient.setQueryData(queryKey, context.previous);
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey }),
});
