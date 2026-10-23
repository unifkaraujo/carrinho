import type { QueryClient, QueryKey } from '@tanstack/react-query';

export const optimisticHandlers = <TData, TVariables>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  update: (data: TData, variables: TVariables) => TData,
) => ({
  onMutate: async (variables: TVariables) => {
    await queryClient.cancelQueries({ queryKey });
    queryClient.setQueryData<TData>(queryKey, (data) =>
      data === undefined ? data : update(data, variables),
    );
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey }),
});
