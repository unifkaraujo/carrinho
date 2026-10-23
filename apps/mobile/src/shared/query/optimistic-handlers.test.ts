import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import { optimisticHandlers } from './optimistic-handlers';

const QUERY_KEY = ['items'];
const SCOPE = { id: 'items' };

const deferred = () => {
  let resolve: () => void = () => undefined;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

const setup = () => {
  const queryClient = new QueryClient();
  queryClient.setQueryData<string[]>(QUERY_KEY, ['a', 'b', 'c']);
  const invalidate = vi.spyOn(queryClient, 'invalidateQueries').mockResolvedValue();
  const requests = [deferred(), deferred()];
  const remove = (index: number) =>
    queryClient
      .getMutationCache()
      .build(queryClient, {
        scope: SCOPE,
        mutationFn: () => requests[index]?.promise ?? Promise.resolve(),
        ...optimisticHandlers<string[], string>({
          queryClient,
          queryKey: QUERY_KEY,
          scopeId: SCOPE.id,
          update: (items, id) => items.filter((item) => item !== id),
        }),
      })
      .execute(index === 0 ? 'a' : 'b');
  return { queryClient, invalidate, requests, remove };
};

describe('optimisticHandlers', () => {
  it('applies queued changes right away and refetches only after the last one', async () => {
    const { queryClient, invalidate, requests, remove } = setup();

    const first = remove(0);
    const second = remove(1);
    await vi.waitFor(() => expect(queryClient.getQueryData(QUERY_KEY)).toEqual(['c']));

    requests[0]?.resolve();
    await first;
    expect(invalidate).not.toHaveBeenCalled();

    requests[1]?.resolve();
    await second;
    expect(invalidate).toHaveBeenCalledTimes(1);
  });
});
