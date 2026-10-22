import { useMutation } from '@tanstack/react-query';
import type { Item } from '../domain/item';
import { ITEM_MUTATION_KEYS } from '../data/item-mutation-keys';
import type { UpdateItemVariables } from '../data/update-item-variables';

export const useItemActions = () => {
  const update = useMutation<Item, Error, UpdateItemVariables>({
    mutationKey: ITEM_MUTATION_KEYS.update,
  });
  const remove = useMutation<undefined, Error, string>({ mutationKey: ITEM_MUTATION_KEYS.remove });
  const clearBought = useMutation<undefined, Error, undefined>({
    mutationKey: ITEM_MUTATION_KEYS.clearBought,
  });

  return {
    toggle: (item: Item) =>
      update.mutate({
        id: item.id,
        patch: { status: item.status === 'pending' ? 'bought' : 'pending' },
      }),
    update: (variables: UpdateItemVariables) => update.mutate(variables),
    remove: (item: Item) => remove.mutate(item.id),
    clearBought: () => clearBought.mutate(undefined),
  };
};
